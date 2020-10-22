const mongoose = require('mongoose');

const enterpriseSchema = new mongoose.Schema({
  siren: {type:String,unique:true,required:true},
  nic: String,
  siret: {type:String,unique:true,required:true},
  statutDiffusionEtablissement: String,
  dateCreationEtablissement: String,
  trancheEffectifsEtablissement: String,
  anneeEffectifsEtablissement: String,
  activitePrincipaleRegistreMetiersEtablissement: String,
  dateDernierTraitementEtablissement: String,
  etablissementSiege: String,
  nombrePeriodesEtablissement: String,
  complementAdresseEtablissement: String,
  numeroVoieEtablissement: String,
  indiceRepetitionEtablissement: String,
  typeVoieEtablissement: String,
  libelleVoieEtablissement: String,
  codePostalEtablissement: String,
  libelleCommuneEtablissement: String,
  libelleCommuneEtrangerEtablissement: String,
  distributionSpecialeEtablissement: String,
  codeCommuneEtablissement: String,
  codeCedexEtablissement: String,
  libelleCedexEtablissement: String,
  codePaysEtrangerEtablissement: String,
  libellePaysEtrangerEtablissement: String,
  complementAdresse2Etablissement: String,
  numeroVoie2Etablissement: String,
  indiceRepetition2Etablissement: String,
  typeVoie2Etablissement: String,
  libelleVoie2Etablissement: String,
  codePostal2Etablissement: String,
  libelleCommune2Etablissement: String,
  libelleCommuneEtranger2Etablissement: String,
  distributionSpeciale2Etablissement: String,
  codeCommune2Etablissement: String,
  codeCedex2Etablissement: String,
  libelleCedex2Etablissement: String,
  codePaysEtranger2Etablissement: String,
  libellePaysEtranger2Etablissement: String,
  dateDebut: String,
  etatAdministratifEtablissement: String,
  enseigne1Etablissement: String,
  enseigne2Etablissement: String,
  enseigne3Etablissement: String,
  denominationUsuelleEtablissement: String,
  activitePrincipaleEtablissement: String,
  nomenclatureActivitePrincipaleEtablissement: String,
  caractereEmployeurEtablissement: String,
});
const Enterprise = mongoose.model('Enterprise', enterpriseSchema);

function onConnection(callback) {
  if ('function' !== typeof callback) {
    throw 'You must send a callback in first argument.';
  }

  mongoose.connect("mongodb+srv://nabil:Bejaia954@cluster0.kcnnt.mongodb.net/pm2?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})

  mongoose.connection.on('error', (e) => {
    console.error('Mongoose error during process execution : ', e);
    throw e;
  });

  mongoose.connection.once('open', function() {
    callback();
  })
}

module.exports = {
  Enterprise,
  onConnection
}
