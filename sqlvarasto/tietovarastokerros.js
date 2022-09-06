
const Tietokanta = require('../tietokanta');
const optiot =require('./yhteysoptiot.json');

const sql=require('./sqllauseet.json');
const haeKaikkiSql = sql.haeKaikki.join(' ');

module.exports = class Tietovarasto{
    constructor(){
        this.db = new Tietokanta(optiot);
    }
    haeKaikki(){
        return new Promise( async (resolve,reject)=>{
            try{
                const tulos = await this.db.suoritaKysely(haeKaikkiSql);
                resolve(tulos.kyselynTulos);
            }
            catch(virhe){
                // console.log(virhe);
                reject("oho");
            }
        })
    } //haeKaikki loppu
}