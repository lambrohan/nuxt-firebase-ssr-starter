const functions = require("firebase-functions");
const { Nuxt } = require("nuxt");
const express = require("express");
const app = express();

const config = {
  dev: false,
  buildDir: "nuxt",
  build: {
    publicPath: "/assets/"
  }
};
const nuxt = new Nuxt(config);

function handleRequest(req, res) {
  console.log("log3");
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  nuxt.renderRoute('/')
  .then(result=>{
    res.send(result.html)
  }).catch(e=>{
    console.log('error render',e)
    res.send(e)
  })
}

app.get('*',handleRequest);

exports.nuxtssr = functions.https.onRequest(app);
