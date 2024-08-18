import 'package:flutter/material.dart';

class PageTransition extends PageRouteBuilder {
  final Widget child;
  final bool slideRight;
  final bool slideLeft;
  final bool slideUp;
  final bool slideDown;
  final bool scale;
  final bool rotate;
  final bool size;
  final bool fade;

  PageTransition({
    required this.child,
    this.slideRight = false,
    this.slideLeft = false,
    this.slideUp = false,
    this.slideDown = false,
    this.scale = false,
    this.rotate = false,
    this.size = false,
    this.fade = false,
  }) : super(
          transitionDuration: Duration(milliseconds: 500),
          transitionsBuilder: (BuildContext context,
              Animation<double> animation,
              Animation<double> secondaryAnimation,
              Widget child) {
            if (slideRight) {
              return SlideTransition(
                position: Tween<Offset>(
                  begin: const Offset(1.0, 0.0),
                  end: Offset.zero,
                ).animate(animation),
                child: child,
              );
            } else if (slideLeft) {
              return SlideTransition(
                position: Tween<Offset>(
                  begin: const Offset(-1.0, 0.0),
                  end: Offset.zero,
                ).animate(animation),
                child: child,
              );
            } else if (slideUp) {
              return SlideTransition(
                position: Tween<Offset>(
                  begin: const Offset(0.0, 1.0),
                  end: Offset.zero,
                ).animate(animation),
                child: child,
              );
            } else if (slideDown) {
              return SlideTransition(
                position: Tween<Offset>(
                  begin: const Offset(0.0, -1.0),
                  end: Offset.zero,
                ).animate(animation),
                child: child,
              );
            } else if (scale) {
              return ScaleTransition(
                scale: animation,
                child: child,
              );
            } else if (rotate) {
              return RotationTransition(
                turns: animation,
                child: child,
              );
            } else if (size) {
              return SizeTransition(
                sizeFactor: animation,
                child: child,
              );
            } else if (fade) {
              return FadeTransition(
                opacity: animation,
                child: child,
              );
            } else {
              // Default transition
              return FadeTransition(
                opacity: animation,
                child: child,
              );
            }
          },
          pageBuilder: (BuildContext context, Animation<double> animation,
              Animation<double> secondaryAnimation) {
            return child;
          },
        );
}