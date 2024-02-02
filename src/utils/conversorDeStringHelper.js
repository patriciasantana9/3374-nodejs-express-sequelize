module.exports = (objetoParams) => {
  for (let propriedade in objetoParams) {
  //expressão regular; test() é um método de expressão regular JS pra testar se propriedade possui uma das strings citadas antes
    if(/Id|id/.test(propriedade)){
      objetoParams[propriedade] = Number(objetoParams[propriedade]);
    }
  }
  return objetoParams;
};