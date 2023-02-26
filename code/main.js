'use strict';
// Imports the Google Cloud client libraries
const projectId = 'chickenscratch-378917';


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
    
    pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a5',
        putOnlyUsedFonts:true
    });

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
    await pdf.save("genPDFTest.pdf", { returnPromise:true });
    console.log("Saving pdf");
}
//readInImage();