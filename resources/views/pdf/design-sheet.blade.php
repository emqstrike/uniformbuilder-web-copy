<!DOCTYPE html>
<html>
<head>
<title></title>
<style> body { font-size: 0.8em; } td { font-size: 0.8em; } </style>
</head>
<body>

<div style ="width: 100%; text-align: center;">
   <h3>PROLOOK UNIFORM CUSTOMIZER - ORDER FORM ({{ $uniform_category }})</h3>
</div>
  <table width="100%">
    <tr>
    <td>
        $this->generateItemTable($firstOrderItem, '/design_sheets/{{ $filename }}.pdf');
    </td>
    </tr>
  </table>

  <table width="100%" style="height: 750px">
  <tr>
  <td width="50%" style="text-align=center;">
  <br /><br />
  $this->generateClientDetailsTable($mainInfo);
  <br /><br />
  </td>
  <td width="30%">
  <br /><br />
  $this->generateSizeBreakDownTable($firstOrderItem);
  <br /><br />
  </td>
  </tr>
  </table>
  </div>

$pdf->writeHTML($html, true, false, true, false, '');

  <div>
     <div style ="width: 100%; text-align: center;">
        <h3>PREVIEW</h3>
     </div>
    <br /><br /><br /><br /><br /><br />
      <table>
        <tr style="height: 100px;"><td></td><td></td><td></td><td></td></tr>
        <tr>
           <td><img style="margin-top: 30px; width: 200px;" src="{{ $frontViewImage }}"/></td>
           <td><img style="margin-top: 30px; width: 200px;" src="{{ $backViewImage }}"/></td>
           <td><img style="margin-top: 30px; width: 200px;" src="{{ $leftViewImage }}"/></td>
           <td><img style="margin-top: 30px; width: 200px;" src="{{ $rightViewImage }}"/></td>
        </tr>
       <tr style="height: 100px;"><td></td><td></td><td></td><td></td></tr>
  </table>
</div>

</body>
</html>