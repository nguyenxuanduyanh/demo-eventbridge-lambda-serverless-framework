exports.successHandler = async (event) => {
  console.log('--- Signup Success---')
  console.log(JSON.stringify(event, null, 2))
}

exports.failHandler = async (event) => {
  console.log('--- Signup Fail ---')
  console.log(JSON.stringify(event, null, 2))
}

exports.hello = async (event) => {
  console.log('Hello');
}