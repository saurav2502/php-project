<?php
set_time_limit(0);
ini_set('memory_limit', '-1');
// Include the main TCPDF library and TCPDI.
require_once('vendor\setasign\tcpdf\tcpdf.php');
require_once('vendor\setasign\tcpdf\tcpdi.php');

// Create new PDF document.

$pdf = new TCPDI();

$files = [
    'pdf/pdf1.pdf',
    'pdf/pdf2.pdf',
    'pdf/pdf3.pdf',
    'pdf/pdf4.pdf',
];

foreach ($files as $file) {
    $pageCount = $pdf->setSourceFile($file);

    for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {
        $tplidx = $pdf->importPage($pageNo, '/BleedBox');
		$size = $pdf->getTemplatesize($tplidx);
		$orientation = ($size['w'] > $size['h']) ? 'L' : 'P';
        $pdf->AddPage($orientation);
        $s = $pdf->useTemplate($tplidx, 10, 10, 200);
    }
}

$outPutPath = $_SERVER['DOCUMENT_ROOT'].'/php-project/pdf/merged.pdf';
//$pdf->Output('output/'.$file, 'I');
$pdf->Output($outPutPath, 'FD');
echo json_encode(['filename' => $outPutPath]);
?>
