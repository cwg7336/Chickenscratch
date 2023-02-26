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

module.exports = async function readInImage() {
    // Imports the Google Cloud client libraries
    //const jsPDF  = require("jspdf");
    const vision = require('@google-cloud/vision').v1p3beta1;
    const fs = require('fs');
 
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
 
    files.push(`./media/example2.jpg`);
    files.push(`./media/example.jpg`);
    files.push(`./media/wakeupcat.jpg`);

    
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
          generatePDF(fullTextAnnotation.text, i);
    }
}

//readInImage();