<?php
namespace App\Http\Controllers\Administration;

use \mysqli;
use \PDO;
use Crypt;
use Session;
use Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\DataBackupAPIClient as APIClient;

class DataBackupController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {


        return view('administration.databackup.data_backup', [
           
        ]);
    }

    public function backup()
    {

    return view('administration.databackup.backup', [
  
        $this->backupdb()
        ]);
    }

    public function restore()
    {

    return view('administration.databackup.restore', [
   
        $this->restoredb()

        ]);
    }

    public function backupdb(){
        $dbhost = env('DB_HOST');
        $dbuser = env('DB_USERNAME');
        $dbpass = env('DB_PASSWORD');
        $dbname = env('DB_DATABASE');
        $datetoday = date("g:ia \o\n l jS F Y");
    
        $pdo = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
 
        $output = "-- PHP MySQL Dump\n--\n";
        $output .= "-- Host: $dbhost\n";
        $output .= "-- Generated: " . date("r", time()) . "\n";
        $output .= "-- PHP Version: " . phpversion() . "\n\n";
        $output .= "SET SQL_MODE=\"NO_AUTO_VALUE_ON_ZERO\";\n\n";
        $output .= "--\n-- Database: `$dbname`\n--\n";
   
        $tables = array();
        $stmt = $pdo->query("SHOW TABLES");
        while($row = $stmt->fetch(PDO::FETCH_NUM)){
            $tables[] = $row[0];
        }
    
        foreach($tables as $table){
            $fields = "";
            $sep2 = "";
            $output .= "\n-- " . str_repeat("-", 60) . "\n\n";
            $output .= "--\n-- Table structure for table `$table`\n--\n\n";
          
            $stmt = $pdo->query("SHOW CREATE TABLE $table");
            $row = $stmt->fetch(PDO::FETCH_NUM);
            $output.= $row[1].";\n\n";
     
            $output .= "--\n-- Dumping data for table `$table`\n--\n\n";
            $stmt = $pdo->query("SELECT * FROM $table");
            while($row = $stmt->fetch(PDO::FETCH_OBJ)){
          
                if($fields == ""){
                    $fields = "INSERT INTO `$table` (";
                    $sep = "";
         
                    foreach($row as $col => $val){
                        $fields .= $sep . "`$col`";
                        $sep = ", ";
                    }
                    $fields .= ") VALUES";
                    $output .= $fields . "\n";
                }
          
                $sep = "";
                $output .= $sep2 . "(";
                foreach($row as $col => $val){
     
                    $val = addslashes($val);
        
                    $search = array("\'", "\n", "\r");
                    $replace = array("''", "\\n", "\\r");
                    $val = str_replace($search, $replace, $val);
                    $output .= $sep . "'$val'";
                    $sep = ", ";
                }
         
                $output .= ")";
                $sep2 = ",\n";
            }
       
            $output .= ";\n";
        }   

        header('Content-Description: File Transfer');
        header('Content-type: application/octet-stream');
        header('Content-Disposition: attachment; filename=' . $dbname . '-' . $datetoday . '.sql');
        
        
        header('Content-Transfer-Encoding: binary');
        header('Content-Length: ' . strlen($output));
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Expires: 0');
        header('Pragma: public');
        echo $output;

        // header('Content-Type: text/csv');
        // header('Content-Disposition: attachment; filename=example.csv');
        // readfile('/foo/bar/baz.csv');
    }

    public function restoredb()
    {
        $dbhost = env('DB_HOST');
        $dbuser = env('DB_USERNAME');
        $dbpass = env('DB_PASSWORD');
        $dbname = "qstrikedb";
        $mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
        $mysqli->query('SET foreign_key_checks = 0');
        if ($result = $mysqli->query("SHOW TABLES"))
        {
            while($row = $result->fetch_array(MYSQLI_NUM))
            {
                $mysqli->query('DROP TABLE IF EXISTS '.$row[0]);
            }
        }

        $mysqli->query('SET foreign_key_checks = 1');
        $mysqli->close();

        $filename = 'D:/backup/quickstrike-6-15am o Thursday 8th October 2015.sql';
        $mysql_database = 'qstrikedb';

        mysqli_connect($dbhost, $dbuser, $dbpass) or die('Error connecting to MySQL server: ' . mysql_error());

        mysqli_select_db($mysql_database) or die('Error selecting MySQL database: ' . mysqli_error());


        $templine = '';

        $lines = file($filename);

        foreach ($lines as $line)
        {
   
            if (substr($line, 0, 2) == '--' || $line == '')
                continue;

          
            $templine .= $line;
          
            if (substr(trim($line), -1, 1) == ';')
            {
            
                mysql_query($templine) or print('Error performing query \'<strong>' . $templine . '\': ' . mysql_error() . '<br /><br />');
            
                $templine = '';
            }
        }
         echo "Tables imported successfully";

    }


// {{$asset_storage}}/bootstrap/css/bootstrap.min.css
// file = $asset_storage."/bootstrap/css/bootstrap.min.css"
}
