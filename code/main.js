'use strict';
// Imports the Google Cloud client libraries
const projectId = 'chickenscratch-378917';

// Attempted web version , not currently working
//import vision from '/@google-cloud/vision';
//import { debug } from './console';
//import fs from '/fs';
/*
function onload()
{
    console.log("On load");
    document.getElementById("noteSubmitButton").onclick = async() =>{
        readInImage();
    };
}

async function readInImage() {

    //const vision = require('@google-cloud/vision').v1p3beta1;
    //const fs = require('fs');

    console.log("Called readInImage");
    
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    const files = document.getElementById('files').files;

    //let fileName = files[0];

    for(let i = 0; i < files.length; i++)
    {
        const request = {
            image: {
                content: fs.readFileSync(files[i]),
            },
            feature: {
                languageHints: ['en-t-i0-handwrit'],
            },
        };
    
        const [result] = await client.documentTextDetection(request);
        const fullTextAnnotation = result.fullTextAnnotation;
        console.log(`Full text: ${fullTextAnnotation.text}`);
    }
}
*/

//Hard coded version, Node.js
const { jsPDF }  = require("jspdf");

let pdf = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a5',
    putOnlyUsedFonts:true
});

let files = [];

function generatePDF(resultText, int){
    pdf.text(`${resultText}`,10,10);
    pdf.save("genPDFTest.pdf");
    if(files.length > 1 && int < files.length)
    {
        pdf.addPage();
    }
}

function correctB64Formatting(b64) {
    return b64.split(',')[1];
}

module.exports = async function readInImages(b64blobs) {
    // Imports the Google Cloud client libraries
    //const jsPDF  = require("jspdf");
    const vision = require('@google-cloud/vision').v1p3beta1;

    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    for(let i = 0; i < b64blobs.length; i++)
    {
        const request = {
            image: {
              //content: fs.readFileSync(files[i]),
              content: correctB64Formatting(b64blobs[i])
            },
            feature: {
              languageHints: ['en-t-i0-handwrit'],
            },
        };
        
        const [result] = await client.documentTextDetection(request);
        const fullTextAnnotation = result.fullTextAnnotation;
        generatePDF(fullTextAnnotation.text, i);
    }
}
//readInImage();