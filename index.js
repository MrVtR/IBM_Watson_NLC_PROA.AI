require('dotenv/config');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2020-08-01',
  authenticator: new IamAuthenticator({
    apikey: process.env.NLU_API_CODE,
  }),
  serviceUrl: process.env.NLU_URL_CODE,
});

const analyzeParams = {
  text:
    'Pokémon é uma franquia de mídia que pertence a The Pokémon Company, tendo sido criada por Satoshi Tajiri em 1995. Ela é centrada em criaturas ficcionais chamadas "Pokémon"',
  features: {
    concepts: {
      limit: 3,
    },
  },
};

naturalLanguageUnderstanding
  .analyze(analyzeParams)
  .then((analysisResults) => {
    console.log('\n', analysisResults.status, analysisResults.statusText);
    console.log(
      '\nResultados:\n',
      JSON.stringify(analysisResults.result, null, 2),
    );
  })
  .catch((err) => {
    console.log('error:', err);
  });
