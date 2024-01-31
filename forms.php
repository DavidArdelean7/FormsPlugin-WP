<?php

namespace WTForms;
/**
 * Plugin Name: WTForms
 * Description: User Register and User Login forms (shortcodes provided: [register_form], [login_form])  that use OTP API
 * Version: 2.0
 * Author: David Ardelean
 * Text Domain: wt-forms
 */


if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if (!function_exists('write_log')) {

    function write_log($log) {
        if (true === WP_DEBUG) {
            if (is_array($log) || is_object($log)) {
                error_log(print_r($log, true));
            } else {
                error_log($log);
            }
        }
    }
}

require_once __DIR__ . '/autoload.php';


use \add_menu_page;
/**
 * Class WTForms\OTPForms
 *
 * Main class for the Forms component
 *
 */
class OTPForms {

    public static ?object $forms = null;
    private object $auxiliary_component, $login, $register;

    public static function get_instance(): OTPForms {
        if ( self::$forms === null ) self::$forms = new OTPForms();

        return self::$forms;
    }

    public function init() : void {

        define( 'FORMS_PLUGIN_URL', plugin_dir_url( dirname(__FILE__ ) ) );
        define( 'FORMS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
        register_activation_hook(__FILE__, array($this,'grw_forms_activation'));

        $this->load_dependencies();
        $this->hook_loader();
        $this->shortcode_loader();
    }

    public function enqueue_scripts_and_styles() : void{
        wp_enqueue_script('select2', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js', array('jquery'), '4.1.0-rc.0', true);
        wp_enqueue_script('forms-plugin-script', plugins_url('js/wt-forms.js', __FILE__), array('jquery', 'select2'), '2.7', true);
        wp_enqueue_style('form-styles', plugins_url('css/wt-forms-style.css', __FILE__), array(), '3.9', 'all');
        wp_enqueue_style('select2-css', 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css', array(), '4.1.0-rc.0');
        wp_enqueue_style('flag-icon-css', 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css', array(), '3.5.0');
        $stored_json = get_option('phone_options');
        $json_data = unserialize($stored_json);
        wp_localize_script('forms-plugin-script', 'PhonePrefixes', $json_data);
    }

    private function load_dependencies(): void {
        $this->register = new RegisterForm();
        $this->login = new LoginForm();
        $this->auxiliary_component = new Auxiliary();
    }
    public function hook_loader() : void{

        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts_and_styles'));
        add_action('admin_menu', array($this, 'grw_menu'));

        add_action('wp_ajax_nopriv_custom_register', array($this->register, 'custom_register'));
        add_action('wp_ajax_custom_register', array($this->register, 'custom_register'));

        add_action('wp_ajax_nopriv_get_cities', array($this->register, 'get_cities'));
        add_action('wp_ajax_custom_get_cities', array($this->register, 'get_cities'));
                
        add_action('wp_ajax_nopriv_check_email', array($this->register, 'check_email'));
        add_action('wp_ajax_check_email', array($this->register, 'check_email'));

        add_action('wp_ajax_login_email', array($this->login, 'login_email'));
        add_action('wp_ajax_nopriv_login_email', array($this->login, 'login_email'));

        add_action('wp_ajax_login_phone', array($this->login, 'login_phone'));
        add_action('wp_ajax_nopriv_login_phone', array($this->login, 'login_phone'));

        add_action('wp_ajax_custom_user_login', array($this->login, 'custom_user_login'));
        add_action('wp_ajax_nopriv_custom_user_login', array($this->login, 'custom_user_login'));

        add_action('wp_ajax_email_otp', array($this->register, 'email_otp'));
        add_action('wp_ajax_nopriv_email_otp', array($this->register, 'email_otp'));

    }

    public function shortcode_loader() : void{
        add_shortcode('login_form', array( $this->auxiliary_component, 'login_form_shortcode'));
        add_shortcode('register_form', array( $this->auxiliary_component, 'register_form_shortcode'));
        add_shortcode('wc_lost_password_form', array( $this->auxiliary_component, 'wc_lost_password_form_shortcode'));
    }

    

    public function grw_forms_activation() : void{
    // Code to run when the plugin is activated
    // For example, create database tables, set default options, etc.
        $this->auxiliary_component->phone_prefixes();
        //$this->auxiliary_component->romanian_counties();

    }

    public function grw_menu() : void{
        \add_menu_page(
            'WT Forms',    // Page title
            'WTForms',         // Menu title
            'manage_options',    // Capability (who can access)
            'wt-forms',    // Menu slug (unique identifier)
            array($this,'wt_forms_page'),    // Callback function to display the page content
            'dashicons-forms', // Icon (optional, dashicons or custom URL)
            99                   // Position (optional, the lower the number, the higher on the menu)
        );
    }
    
    public function wt_forms_page() : void {
        // Display your plugin's page content here
        echo '<div class="wrap"><h1>Hello, this is my plugin project!</h1></div>';
    }

    

}


$forms = OTPForms::get_instance();
$forms->init();