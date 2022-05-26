<?php
$new_doc = new PDFDoc();
$page_num = 15;
for ($i = 1; $i <= $page_num; ++$i)
{
    $doc = new PDFDoc($filename."_split_page_".$i.".pdf");
    $new_doc->InsertPages($i, $doc, 1, $doc->GetPageCount(), PDFDoc::e_none);
    $doc->Close();
}
$new_doc->Save($output_filename."_merge_pages.pdf", SDFDoc::e_linearized);
$doc->Close();

?>