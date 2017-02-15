<?php

namespace Customizer\Utilities;

use Log;
use PDF;
use View;
use Storage;
use Customizer\Utilities\StringUtility;

define('TEMPORARY_FOLDER', '/tmp/');
define('TCPDF_SAVE_TO_LOCAL_FOLDER', 'F');

class DesignSheetPDF
{
    /**
     * PDF Content
     */
    protected $content;

    /**
     * Generaged PDF path
     */
    protected $path;

    /**
     * Vendor Name
     */
    protected $vendor_name;

    /**
     * Uniform configurations
     */
    protected $configuration;

    /**
     * Uniform Information
     */
    protected $uniform;

    /**
     * Uniform Category
     */
    protected $uniform_category;

    /**
     * Client
     */
    protected $client;

    /**
     * Billing Information
     */
    protected $billing;

    /**
     * Shipping Information
     */
    protected $shipping;

    /**
     * Sizes Information
     */
    protected $sizes;

    /**
     * Roster list
     */
    protected $roster;

    /**
     * Uniform Customization Settings
     */
    protected $customizations;

    /**
     * Uniform Image Perspectives
     */
    protected $perspectives;

    protected $filename;
    protected $s3_path;

    /**
     * @param String $vendor_name
     * @param Array $configuration
     */
    public function __construct(
        $vendor_name,
        $configuration
    )
    {
        $this->vendor_name = $vendor_name;
        $this->configuration = $configuration;

        if (isset($this->configuration['builder_customizations']['shipping']))
        {
            $this->shipping = $this->configuration['builder_customizations']['shipping'];
        }
        if (isset($this->configuration['builder_customizations']['billing']))
        {
            $this->billing = $this->configuration['builder_customizations']['billing'];
        }

        if (isset($this->configuration['builder_customizations']['order_items'][0]))
        {
            $this->uniform = $this->configuration['builder_customizations']['order_items'][0];
        }

        if (isset($this->uniform['order']['client']))
        {
            $this->client = $this->uniform['order']['client'];
        }

        if (isset($this->uniform['builder_customizations']))
        {
            $this->customizations = $this->uniform['builder_customizations'];

            $this->perspectives = $this->customizations['thumbnails'];

            $this->roster = $this->customizations['roster'];

            $this->uniform_category = $this->customizations['uniform_category'];
        }

        $file_id = StringUtility::generateGUID();
        $this->filename = "{$file_id}.pdf";
        Log::info('File name: ' . $this->filename);
    }

    public function getContent()
    {
        return $this->content;
    }

    public function getS3Path()
    {
        return $this->s3_path;
    }

    public function getSaveToPath()
    {
        return TEMPORARY_FOLDER . $this->filename;
    }

    public function generate()
    {
        PDF::SetPrintHeader(false);
        PDF::SetTitle('Order Form');
        PDF::AddPage("P");
        PDF::SetFont('avenir_next', '', 14, '', false);
        // Uniform Information
        PDF::WriteHTML($this->getUniformInformation());
        PDF::AddPage("P");
        PDF::WriteHTML($this->getClientInformation());
        PDF::WriteHTML($this->getBillingInformation());
        PDF::WriteHTML($this->getShippingInformation());
        PDF::AddPage("P");
        PDF::WriteHTML($this->getMaterialOptionsTable());
        PDF::AddPage("L");
        PDF::WriteHTML($this->getSizesBreakdown());
        PDF::AddPage("P");
        PDF::WriteHTML($this->getRosterInformation());
        PDF::AddPage("P");
        PDF::WriteHTML($this->getUniformPerspectives());
        PDF::Output($this->getSaveToPath(), TCPDF_SAVE_TO_LOCAL_FOLDER);

        // Set S3 path
        $this->s3_path = S3Uploader::uploadToS3($this->getSaveToPath());
        Log::info($this->getS3Path());
    }

    private function getClientInformation()
    {
        $client = $this->client;

        return View::make('pdf.design-sheet.client-information', compact('client'));
    }

    private function getUniformInformation()
    {
        $uniform = $this->uniform;

        return View::make('pdf.design-sheet.uniform-information', compact('uniform'));
    }

    private function getBillingInformation()
    {
        $billing = $this->billing;

        return View::make('pdf.design-sheet.billing-information', compact('billing'));
    }

    private function getShippingInformation()
    {
        $shipping = $this->shipping;

        return View::make('pdf.design-sheet.shipping-information', compact('shipping'));
    }

    private function getSizesBreakdown()
    {
        $sizes = $this->uniform['size_breakdown'];
        $sizes_count = count($this->uniform['size_breakdown']);
        $notes = $this->uniform['notes'];
        $attached_file = $this->uniform['attached_file'];

        return View::make('pdf.design-sheet.sizes-breakdown-information', compact(
            'sizes',
            'sizes_count',
            'notes',
            'attached_file'
        ));
    }

    private function getAthleticDirector()
    {
        $athletic_director = $this->athletic_director;

        return View::make('pdf.design-sheet.athletic-director-information', compact('athletic_director'));
    }

    private function getUniformPerspectives()
    {
        $front_view = $this->perspectives['front_view'];
        $back_view = $this->perspectives['back_view'];
        $right_view = $this->perspectives['right_view'];
        $left_view = $this->perspectives['left_view'];

        return View::make('pdf.design-sheet.uniform-perspectives', compact(
            'front_view',
            'back_view',
            'left_view',
            'right_view'
        ));
    }

    private function getMaterialOptionsTable()
    {
        $parts = $this->uniform;

        return View::make('pdf.design-sheet.material-options', compact('parts'));
    }

    private function getRosterInformation()
    {
        $roster = $this->roster;
        $is_wrestling = ($this->uniform_category == 'wrestling');

        return View::make('pdf.design-sheet.roster-information', compact(
            'roster',
            'is_wrestling'
        ));
    }
}
