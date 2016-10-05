#[macro_use]
extern crate neon;
extern crate badger;

use neon::vm::{Call, JsResult, Module};
use neon::js::{JsString, Variant, JsUndefined};
use badger::{parser, transformer, codegen};

fn transform(call: Call) -> JsResult<JsString> {
  let scope = call.scope;

  let source = match call.arguments.get(scope, 0).unwrap().variant() {
      Variant::String(handle) => handle.value(),
      _                       => panic!("First argument must be a string"),
  };

  let minify = match call.arguments.get(scope, 1).unwrap().variant() {
      Variant::Boolean(handle) => handle.value(),
      _                        => panic!("Second argument must be a boolan"),
  };


  let mut ast = parser::parse(source);
  transformer::transform(&mut ast, transformer::Settings::target_es5());
  let out = codegen::generate_code(ast, minify);

  Ok(JsString::new(scope, &out).unwrap())
}

fn parse(call: Call) -> JsResult<JsUndefined> {
  let scope = call.scope;
  let source = match call.arguments.get(scope, 0).unwrap().variant() {
      Variant::String(handle) => handle.value(),
      _                       => panic!("First argument must be a string"),
  };

  let mut ast = parser::parse(source);

  println!("{:#?}", ast.body);
  Ok(JsUndefined::new())
}

register_module!(m, {
  try!(m.export("transform", transform));
  try!(m.export("parse", parse));
  Ok(())
});
