import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';

import 'package:my_tourism_app/main.dart';

class UploadImageScreen extends StatefulWidget {
  final num userId;
  final String token;

  const UploadImageScreen({super.key, required this.userId, required this.token});
  @override
  _UploadImageScreenState createState() => _UploadImageScreenState();
}

class _UploadImageScreenState extends State<UploadImageScreen> {
  File? _image;

  Future<void> _chooseAndUploadImage() async {
    File? image = await pickImage();
    if (image != null) {
      setState(() {
        _image = image;
      });
      await uploadImage(image);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Upload Image')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            _image != null ? Image.file(_image!) : Text('No image selected.'),
            ElevatedButton(
              onPressed: _chooseAndUploadImage,
              child: Text('Choose and Upload Image'),
            ),
          ],
        ),
      ),
    );
  }

  Future<File?> pickImage() async {
    final ImagePicker _picker = ImagePicker();
    final XFile? image = await _picker.pickImage(source: ImageSource.gallery);
    if (image != null) {
      return File(image.path);
    }
    return null;
  }

  Future<void> uploadImage(File imageFile) async {
    String fileName = imageFile.path.split('/').last;
    FormData formData = FormData.fromMap({
      'user_id': widget.userId,
      "profileImage": await MultipartFile.fromFile(imageFile.path, filename: fileName),
    });

    Dio dio = Dio();
    String tokenn = widget.token;
    String forToken = 'Bearer $tokenn';

    dio.options.headers = {
      'Authorization': forToken,
      'Content-Type': 'multipart/form-data',
    };

    try {
      Response response = await dio.post("${url}/api/users/profilePic", data: formData);
      if (response.statusCode == 201) {
        print("Upload successful: ${response.data}");
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text("Upload successful"),
            backgroundColor: Colors.green,
          ),
        );
      } else {
        print("Upload failed: ${response.data}");
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text("Upload failed: ${response.data}"),
            backgroundColor: Colors.red,
          ),
        );
      }
    } on DioError catch (e) {
      print("Upload failed: ${e.response?.data ?? e.message}");
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text("Upload failed: ${e.response?.data ?? e.message}"),
          backgroundColor: Colors.red,
        ),
      );
    }
  }
}
