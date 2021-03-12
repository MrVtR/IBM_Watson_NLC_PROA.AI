require('dotenv/config');
var colors = require('colors');
const NaturalLanguageClassifierV1 = require('ibm-watson/natural-language-classifier/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageClassifier = new NaturalLanguageClassifierV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.API_KEY,
  }),
  serviceUrl: process.env.URL,
});

const classifyCollectionParams = {
  collection: [
    { text: 'Gostaria de pagar um boleto, por favor.' },
    { text: 'Quero ver minhas faltas, vou reprovar?' },
  ],
  classifierId: process.env.NLC_MODEL,
};

naturalLanguageClassifier
  .classifyCollection(classifyCollectionParams)
  .then((response) => {
    const classificationCollection = response.result;
    console.log('');
    classificationCollection.collection.forEach((element) => {
      console.log(
        'A intenção da frase:',
        element.text.green,
        'É da classe:',
        element.top_class.red + '\n' + 'E tem um score entre 0 a 1 de:',
        element.classes[0].confidence,
        '\n',
      );
    });
  })
  .catch((err) => {
    console.log('error:', err);
  });
