<?php namespace Eendonesia\Gapura;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;

class GapuraServiceProvider extends ServiceProvider {

	/**
	 * Indicates if loading of the provider is deferred.
	 *
	 * @var bool
	 */
	protected $defer = false;

	/**
	 * Bootstrap the application events.
	 *
	 * @return void
	 */
	public function boot()
	{
		// $this->package('eendonesia/gapura');
        \View::addNamespace('gapura', base_path('workbench/eendonesia/gapura/src/views/'));
        include __DIR__.'/../../routes.php';
	}

	/**
	 * Register the service provider.
	 *
	 * @return void
	 */
	public function register()
	{
        $this->registerBootstrapFormBuilder();
	}

	/**
	 * Get the services provided by the provider.
	 *
	 * @return array
	 */
	public function provides()
	{
		return ['gapura'];
	}

    protected function registerBootstrapFormBuilder()
    {
        $this->app->register('AdamWathan\BootForms\BootFormsServiceProvider');
        AliasLoader::getInstance()->alias('BootForm', 'AdamWathan\BootForms\Facades\BootForm');

        $this->app->bind('Eendonesia\Gapura\Repository\RepositoryInterface', 'Eendonesia\Gapura\Repository\EloquentRepository');
    }
}
