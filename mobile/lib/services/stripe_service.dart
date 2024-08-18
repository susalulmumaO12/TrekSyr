import 'package:dio/dio.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import '../env.dart';

String? paymentIntentId;

class StripeService {
  StripeService._();

  static final StripeService instance = StripeService._();

  Future<void> makePayment(int amount) async {
    try {
      Map<String, String>? paymentIntent = await _createPaymentIntent(
        amount,
        "usd",
      );

      paymentIntentId = paymentIntent?['paymentIntentId'];
      print('from make payment id is ${paymentIntentId}');
      if (paymentIntent == null) return;
      await Stripe.instance.initPaymentSheet(
        paymentSheetParameters: SetupPaymentSheetParameters(
          paymentIntentClientSecret: paymentIntent['clientSecret'],
          merchantDisplayName: "user of TrekSyr",
        ),
      );
      await _processPayment();
    } catch (e) {
      print(e);
    }
  }

  Future<Map<String, String>?> _createPaymentIntent(
      int amount, String currency) async {
    try {
      final Dio dio = Dio();
      Map<String, dynamic> data = {
        "amount": _calculateAmount(amount),
        "currency": currency,
      };
      var response = await dio.post(
        "https://api.stripe.com/v1/payment_intents",
        data: data,
        options: Options(
          contentType: Headers.formUrlEncodedContentType,
          headers: {
            "Authorization": "Bearer ${STRIPE_SECRET_KEY}",
            "Content-Type": 'application/x-www-form-urlencoded'
          },
        ),
      );

      if (response.data != null) {
        String paymentIntentId =
            response.data["id"]; // <-- This is your paymentIntentId
        String clientSecret = response.data["client_secret"];

        print('PaymentIntent ID: $paymentIntentId');
        print('Client Secret: $clientSecret');

        return {
          "clientSecret": clientSecret,
          "paymentIntentId": paymentIntentId
        }; // Or return paymentIntentId if needed
      }
      return null;
    } catch (e) {
      print(e);
      return null;
    }
  }

  Future<void> _processPayment() async {
    try {
      await Stripe.instance.presentPaymentSheet();
      await Stripe.instance.confirmPaymentSheetPayment();
    } catch (e) {
      print(e);
    }
  }

  String _calculateAmount(int amount) {
    final calculatedAmount = amount * 100;
    return calculatedAmount.toString();
  }

  Future<bool> processRefund(String paymentIntentId, int amount) async {
    try {
      final Dio dio = Dio();
      Map<String, dynamic> data = {
        "payment_intent": paymentIntentId,
        "amount": _calculateAmount(amount),
      };
      var response = await dio.post(
        "https://api.stripe.com/v1/refunds",
        data: data,
        options: Options(
          contentType: Headers.formUrlEncodedContentType,
          headers: {
            "Authorization": "Bearer ${STRIPE_SECRET_KEY}",
            "Content-Type": 'application/x-www-form-urlencoded'
          },
        ),
      );
      if (response.statusCode == 200) {
        print('Refund successful');
        return true;
      } else {
        print('Refund failed');
        return false;
      }
    } catch (e) {
      print(e);
      return false;
    }
  }
}
