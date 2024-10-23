export class AppConstants {
  constructor() {
  }

  public static BASE_URL = 'https://api.taitorakentajat.fi';
  public static API = {
    LOGIN: AppConstants.BASE_URL + '/auth/local',
    REGISTER: AppConstants.BASE_URL + '/auth/local/register',
    ACCOUNTS: AppConstants.BASE_URL + '/accounts/',
    UPDATE_PROFILE: AppConstants.BASE_URL + '/profile/',
    PATCH_ACCOUNT: AppConstants.BASE_URL + '/accounts/',
    SERVICES: AppConstants.BASE_URL + '/services',
    PACKAGES: AppConstants.BASE_URL + '/product-packages',
    PRODUCT: AppConstants.BASE_URL + '/products/',
    SLOTS: AppConstants.BASE_URL + '/slots',
    PLACE_BOOKING: AppConstants.BASE_URL + '/placeBooking',
    UPLOAD_IMAGES: AppConstants.BASE_URL + '/upload',
    POSTCODE: AppConstants.BASE_URL + '/cities',
    MY_BOOKINGS: AppConstants.BASE_URL + '/bookings/me',
    FORGOT_PASSWORD: AppConstants.BASE_URL + '/auth/forgot-password',
    RESET_PASSWORD: AppConstants.BASE_URL + '/auth/reset-password',
    BOOKINGS: AppConstants.BASE_URL + '/bookings',
    COMPANIES: AppConstants.BASE_URL + '/companies',
    REVIEW: AppConstants.BASE_URL + '/reviews',
    REVIEW_EXIST: AppConstants.BASE_URL + '/reviews/booking',
    POST_REVIEW: AppConstants.BASE_URL + '/addReview',

  };

  public static selectedService;
}
