<?php namespace Eendonesia\Moderator;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;

class ModeratorServiceProvider extends ServiceProvider {

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
		// $this->package('eendonesia/moderator');

        include __DIR__.'/../../routes.php';
        include __DIR__.'/../../helpers.php';
	}

	/**
	 * Register the service provider.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->app->bind('Eendonesia\Moderator\RepositoryInterface', 'Eendonesia\Moderator\EloquentRepository');

        $this->app->register('Illuminate\Html\HtmlServiceProvider');
        AliasLoader::getInstance()->alias('Form', 'Illuminate\Html\FormFacade');
        AliasLoader::getInstance()->alias('HTML', 'Illuminate\Html\HtmlFacade');
	}

	/**
	 * Get the services provided by the provider.
	 *
	 * @return array
	 */
	public function provides()
	{
		return [];
	}

}
