<?php
namespace WTForms;
/**
 * Class WTForms\LoginForm
 *
 * Handles loging in
 *
 */
class LoginForm{

    public function __construct(){
        
    }

    public function login_phone(){
	
        global $wpdb;
        $usermeta = $wpdb->prefix . 'usermeta';
        $phone_number = $_POST['phone'];
    
        $queryResults = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM $usermeta WHERE meta_value = %s",
                $phone_number
            )
        );
    
        if (!$queryResults) {
            echo 'false'; 
        }else
            echo 'true'; 
        wp_die();
    }

    
    public function login_email(){
	
        write_log($_POST);
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $creds = array(
                'user_login'    => sanitize_text_field($_POST['login']),
                'user_password' => sanitize_text_field($_POST['password']),
                'remember'      => filter_var($_POST['rememberme'], FILTER_VALIDATE_BOOLEAN)
            );
    
            $user = wp_signon($creds, false);
            write_log($user);
            if (is_wp_error($user)) {
                 echo 'false';
            } else {
                wp_set_current_user($user->ID);
                wp_set_auth_cookie($user->ID);
                echo 'true';
                
            }
            exit;
        }
    }

    
    public function custom_user_login(){
	
        global $wpdb;
        $usermeta = $wpdb -> prefix . 'usermeta';
        $users = $wpdb -> prefix . 'users';
        
        //$phone = sanitize_text_field($_POST['phone']);
        $phone = '"+40773792702"';
        $meta = '"phone_number"';
    
        $username = $wpdb->get_var(
            "SELECT user_login FROM {$usermeta} M
            INNER JOIN {$users} U
            WHERE M.meta_value = {$phone} AND M.user_id = U.ID AND M.meta_key = {$meta}"
        );

        $user = get_user_by('login', $username);
        
        write_log("PHONE");
        write_log($phone);
        write_log($user);
        if ($user) {
                write_log($username);
                 wp_set_current_user($user->ID);
                wp_set_auth_cookie($user->ID);
        } else {
    
            echo "User not found!";
        }
        wp_die();
    
    }

}