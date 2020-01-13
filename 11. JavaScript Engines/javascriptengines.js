// 자바스크립트에서 'print' 함수가 호출될 때마다, v8엔진에 의해 콜백이 호출됩니다.
// 스페이스와 새로운 라인을 기준으로 분리된 stdout에 있는 인자들을 프린트합니다.
// void Print(const v8::FunctionCallbackInfo<v8::Value>& args) {
//     bool first = true;
//     for (int i=0; i<args.length(); i++) {
//       v8::HandleScope handle_scope(args.GetIsolate());
//       if (first) {
//         first = false;
//       } else {
//         print(" ");
//       }
//       v8::String::Utf8Value str(args.GetIsolate(), args[i]);
//       const char* cstr = ToCString(str);
//       printf("%s", cstr);
//     }
//     printf("\n");
//     fflush(stdout);
//   }
