<?php namespace App\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {

	/**
	 * Bootstrap any application services.
	 *
	 * @return void
	 */
	public function boot()
	{
        setlocale(LC_TIME, 'id_ID.utf8');
        include __DIR__.'/../helpers.php';

        Event::subscribe('App\AuditTrail\EventHandler');

        Blade::setRawTags('{{', '}}');
	}

	/**
	 * Register any application services.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->app->bind('App\Cases\RepositoryInterface', 'App\Cases\EloquentRepository');
		$this->app->bind('App\Officer\RepositoryInterface', 'App\Officer\EloquentRepository');
		$this->app->bind('App\Lookup\RepositoryInterface', 'App\Lookup\EloquentRepository');
		$this->app->bind('App\Cases\RepositoryInterface', 'App\Cases\EloquentRepository');
		$this->app->bind('App\Sop\RepositoryInterface', 'App\Sop\EloquentRepository');
		$this->app->bind('App\Menu\RepositoryInterface', 'App\Menu\EloquentRepository');
        $this->app->bind('App\AuditTrail\Activity\RepositoryInterface', 'App\AuditTrail\Activity\EloquentRepository');

		\Config::set('gapura::default_auth', 'admin.home');
		\Config::set('gapura::default_guest', 'home');
		\Config::set('gapura::base_uri', 'gapura');
		\Config::set('gapura::view_login', 'frontend.login');

		\Config::set('skrip::prefix', 'skrip');

        \Config::set('moderator::base_uri', 'acl');
	}

}
