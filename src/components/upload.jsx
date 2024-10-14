import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography, Card, CardContent } from '@mui/material';
import { PDFDocument } from 'pdf-lib';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import axios from 'axios';
import PropTypes from 'prop-types';



const UploadSection = ({ setIsComparisonViewed }) => {
  const navigate = useNavigate();
  const [insuranceFiles, setInsuranceFiles] = useState([]);
  const [brokerFile, setBrokerFile] = useState(null);

  const onInsuranceDrop = (acceptedFiles) => {
    setInsuranceFiles([...insuranceFiles, ...acceptedFiles]);
    acceptedFiles.forEach(file => handleFileData(file, 'insuranceFiles')); // Send insurance files to insuranceFiles endpoint
  };

  const onBrokerDrop = (acceptedFiles) => {
    setBrokerFile(acceptedFiles[0]);
    handleFileData(acceptedFiles[0], 'brokerFiles');
  };

  const handleFileData = async (file, endpoint) => {
    const fileType = file.name.split('.').pop().toLowerCase();

    let fileData = null;

    if (fileType === 'pdf') {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const text = await extractTextFromPDF(pdfDoc);
      fileData = { type: 'pdf', content: text };
    } else if (fileType === 'xls' || fileType === 'xlsx') {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      fileData = { type: 'excel', content: jsonData };
    } else if (fileType === 'doc' || fileType === 'docx') {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      fileData = { type: 'word', content: result.value };
    }

    if (fileData) {
      await sendFileDataToServer(file.name, fileData, endpoint);
    }
  };

  const extractTextFromPDF = async (pdfDoc) => {
    let text = '';
    const numPages = pdfDoc.getPageCount();
    for (let i = 0; i < numPages; i++) {
      const page = pdfDoc.getPage(i);
      const pageText = await page.getTextContent();
      text += pageText.items.map(item => item.str).join(' ');
    }
    return text;
  };

  
  const sendFileDataToServer = async (fileName, fileData, endpoint) => {
    try {
      const response = await axios.post(`http://localhost:5001/${endpoint}`, {
        name: fileName,
        type: fileData.type,
        content: fileData.content,
      });
      console.log(`File data stored successfully in ${endpoint}:`, response.data);
    } catch (error) {
      console.error(`Error storing file data in ${endpoint}:`, error);
    }
  };

  const { getRootProps: getInsuranceRootProps, getInputProps: getInsuranceInputProps } = useDropzone({
    onDrop: onInsuranceDrop,
    accept: '.jpg, .jpeg, .pdf, .xls, .xlsx, .doc, .docx',
    multiple: true,
  });

  const { getRootProps: getBrokerRootProps, getInputProps: getBrokerInputProps } = useDropzone({
    onDrop: onBrokerDrop,
    accept: '.jpg, .jpeg, .pdf, .xls, .xlsx, .doc, .docx',
    multiple: false,
  });

  const isButtonDisabled = insuranceFiles.length === 0 || !brokerFile;

  const handleViewComparison = () => {
    setIsComparisonViewed(true);
    navigate('/overview');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: 'center', marginBottom: '20px' }}>
        Upload Section
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Multi Upload Section for Insurance Files */}
        <Grid item xs={12} sm={10} md={6} lg={4}>
          <Card
            style={{
              borderRadius: '10px',
              boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Multi Upload (Insurance Files)
              </Typography>
              <div
                {...getInsuranceRootProps()}
                style={{
                  border: '2px dashed #888',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <input {...getInsuranceInputProps()} />
                <p style={{ margin: 0, color: '#555' }}>Drag & drop insurance files here, or click to select files</p>
                <em style={{ color: '#aaa' }}>(PDF, Excel, doc, Word formats allowed)</em>
              </div>

              {insuranceFiles.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <Typography variant="subtitle1">Uploaded Insurance Files:</Typography>
                  <ul style={{ paddingLeft: '20px', color: '#333' }}>
                    {insuranceFiles.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Single Upload Section for Broker File */}
        <Grid item xs={12} sm={10} md={6} lg={4}>
          <Card
            style={{
              borderRadius: '10px',
              boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Single Upload (Broker File)
              </Typography>
              <div
                {...getBrokerRootProps()}
                style={{
                  border: '2px dashed #888',
                  padding: '20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <input {...getBrokerInputProps()} />
                <p style={{ margin: 0, color: '#555' }}>Drag & drop a broker file here, or click to select a file</p>
                <em style={{ color: '#aaa' }}>(PDF, Excel, doc, Word formats allowed)</em>
              </div>

              {brokerFile && (
                <div style={{ marginTop: '20px' }}>
                  <Typography variant="subtitle1">Uploaded Broker File:</Typography>
                  <p style={{ color: '#333' }}>{brokerFile.name}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* View Button */}
        <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button
            variant="contained"
            color="primary"
            style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '8px' }}
            // onClick={() => {
            //   // console.log('Navigating to comparison page');
            //   navigate('/overview');
            // }}
            onClick={handleViewComparison}
            disabled={isButtonDisabled}
          >
            View Comparison
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

UploadSection.propTypes = {
  setIsComparisonViewed: PropTypes.func.isRequired,
};

export default UploadSection;
