<?php namespace Eendonesia\Skrip;

use Illuminate\Support\ServiceProvider;

class SkripServiceProvider extends ServiceProvider {

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
		// $this->package('eendonesia/skrip');

        include __DIR__.'/../../routes.php';
	}

	/**
	 * Register the service provider.
	 *
	 * @return void
	 */
	public function register()
	{
        $this->app->bind('Eendonesia\Skrip\Post\RepositoryInterface', 'Eendonesia\Skrip\Post\EloquentRepository');
	}

	/**
	 * Get the services provided by the provider.
	 *
	 * @return array
	 */
	public function provides()
	{
		return ['skrip'];
	}

}
