<?php
/**
 * Asset Version Upgrade Command
 *
 * @author Romack Natividad <romack@qstrike.com>
 * @since February 9, 2017
 */

namespace App\Console\Commands;

use Illuminate\Console\Command;

class AssetVersionUpgradeCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'asset_version:upgrade';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Upgrades the asset_version variable in the environment configuration settings.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function fire()
    {
        $version = $this->generateVersion();

        if (! $this->setAssetVersionInEnvironmentFile($version)) {
            return;
        }

        $this->laravel['config']['customizer.asset_version'] = $version;

        $this->info("Application version [$version] set successfully.");
    }

    /**
     * Generates a newer version of the `ASSET_VERSION`
     *
     * @return string
     */
    protected function generateVersion()
    {
        $currentVersion = config('customizer.asset_version');
        if (empty($currentVersion))
        {
            $newVersion = 0.0001;
        }
        else
        {
            $pos = strpos($currentVersion, '.');
            $version_suffix = substr($currentVersion, ($pos + 1));
            $version_prefix = substr($currentVersion, 0, $pos);
            if ($pos > 0)
            {
                $version_suffix = (int) $version_suffix;
                $version_prefix = (int) $version_prefix;
                $version_suffix++;
                if ($version_suffix > 9999)
                {
                    $version_suffix = 0000;
                    $version_prefix++;
                }
            }
            $newVersion = "{$version_prefix}.{$version_suffix}";
        }

        return $newVersion;
    }

    /**
     * Set the ASSET_VERSION in the environment file.
     *
     * @param  string  $version
     * @return bool
     */
    protected function setAssetVersionInEnvironmentFile($version)
    {
        $currentVersion = config('customizer.asset_version');
        $this->info('Previous version: ' . $currentVersion);

        $this->writeNewEnvironmentFileWith($version);

        return true;
    }

    /**
     * Write a new environment file with the given version.
     *
     * @param  string  $version
     * @return void
     */
    protected function writeNewEnvironmentFileWith($version)
    {
        $path = base_path('.env');

        file_put_contents($path, preg_replace(
            $this->assetVersionReplacementPattern(),
            'ASSET_VERSION='.$version,
            file_get_contents($path)
        ));
    }

    /**
     * Get a regex pattern that will match env ASSET_VERSION with a newer version.
     *
     * @return string
     */
    protected function assetVersionReplacementPattern()
    {
        $escaped = preg_quote('='.$this->laravel['config']['customizer.asset_version'], '/');

        return "/^ASSET_VERSION{$escaped}/m";
    }
}
