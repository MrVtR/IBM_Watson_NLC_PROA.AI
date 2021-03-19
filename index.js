require('dotenv/config');
const moduloJson = require('./json.js');
const json = moduloJson.json;
const NaturalLanguageClassifierV1 = require('ibm-watson/natural-language-classifier/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
let array = [];

const naturalLanguageClassifier = new NaturalLanguageClassifierV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.API_KEY,
  }),
  serviceUrl: process.env.URL,
});

const classifyCollectionParams = {
  collection: json.collection1,
  classifierId: process.env.NLC_MODEL,
};

naturalLanguageClassifier
  .classifyCollection(classifyCollectionParams)
  .then((response) => {
    const classificationCollection = response.result;
    console.log('');
    classificationCollection.collection.forEach((element) => {
      array.push({
        frase: element.text,
        primeiraClasse: element.top_class,
        primeiraConfiança: element.classes[0].confidence,
        segundaClasse: element.classes[1].class_name,
        segundConfiança: element.classes[1].confidence,
        terceiraClasse: element.classes[2].class_name,
        terceiraConfiança: element.classes[2].confidence,
      });
    });
    console.log(array);
  })
  .catch((err) => {
    console.log('error:', err);
  });
