<?php
/**
 * Simply import all pages and different bounding boxes from different PDF documents.
 */

use setasign\Fpdi;
use setasign\fpdf;

require_once 'vendor/autoload.php';
require_once 'vendor/setasign/fpdf/fpdf.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);
set_time_limit(0);
date_default_timezone_set('UTC');
$start = microtime(true);

if (!empty($_POST)) {
    $array = $_POST['data'];
    $firstPdf = $array["pdfFirstFile"];
    $secondPdf = $array["pdfSecondFile"];
}

$pdf = new Fpdi\Fpdi();
//$pdf = new Fpdi\TcpdfFpdi('L', 'mm', 'A3');

if ($pdf instanceof \TCPDF) {
    $pdf->SetProtection(['print'], '', 'owner');
    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);
}

/*$files = [
    'pdf/pdf1.pdf',
    'pdf/pdf2.pdf',
    'pdf/pdf3.pdf',
    'pdf/pdf4.pdf',
];*/
$files = [$firstPdf, $secondPdf];


foreach ($files as $file) {
    $pageCount = $pdf->setSourceFile($file);

    for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {
        $pdf->AddPage();
        $pageId = $pdf->importPage($pageNo, '/MediaBox');
        //$pageId = $pdf->importPage($pageNo, Fpdi\PdfReader\PageBoundaries::ART_BOX);
        $s = $pdf->useTemplate($pageId, 10, 10, 200);
    }
}
$outPutPath = 'pdf/'. uniqid().'.pdf';
$pdf->Output('F', $outPutPath);
echo json_encode(['filename' => $outPutPath]);
exit();
//$pdf->Output('output/'.$file, 'I');
?>
