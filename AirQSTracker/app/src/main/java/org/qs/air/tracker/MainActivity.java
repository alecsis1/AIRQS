package org.qs.air.tracker;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.PowerManager;
import android.support.annotation.DrawableRes;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.ActivityCompat.OnRequestPermissionsResultCallback;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdate;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.loopj.android.http.AsyncHttpClient;
import com.loopj.android.http.JsonHttpResponseHandler;
import com.loopj.android.http.PersistentCookieStore;
import com.loopj.android.http.RequestParams;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import cz.msebera.android.httpclient.Header;
import cz.msebera.android.httpclient.HeaderElement;
import cz.msebera.android.httpclient.HttpEntity;
import cz.msebera.android.httpclient.NameValuePair;
import cz.msebera.android.httpclient.ParseException;
import cz.msebera.android.httpclient.client.entity.UrlEncodedFormEntity;
import cz.msebera.android.httpclient.entity.StringEntity;
import cz.msebera.android.httpclient.message.BasicNameValuePair;

public class MainActivity extends FragmentActivity implements OnMapReadyCallback,
        // GoogleMap.OnMyLocationButtonClickListener,
        // GoogleMap.OnMyLocationClickListener,
        // LocationListener,
        OnRequestPermissionsResultCallback {

    private GoogleMap mMap;
    private LocationManager locationManager;
    private String locationProvider;
    private Marker mPosition;
    private AsyncHttpClient client;

    private PersistentCookieStore myCookieStore;

    /**
     * Request code for location permission request.
     *
     * @see #onRequestPermissionsResult(int, String[], int[])
     */
    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1;

    /**
     * Flag indicating whether a requested permission has been denied after returning in
     * {@link #onRequestPermissionsResult(int, String[], int[])}.
     */
    private boolean mPermissionDenied = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
        PowerManager.WakeLock wl = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "AIRQS");
        wl.acquire();
    }

    @Override
    protected void onStart() {
        super.onStart();

        this.locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
        Criteria criteria = new Criteria();
        this.locationProvider = locationManager.getBestProvider(criteria, false);
        client = new AsyncHttpClient();
        myCookieStore = new PersistentCookieStore(this);
        client.setCookieStore(myCookieStore);
    }

    @Override
    protected void onResumeFragments() {
        super.onResumeFragments();
        if (mPermissionDenied) {
            // Permission was not granted, display error dialog.
            showMissingPermissionError();
            mPermissionDenied = false;
        }else{
            this.locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
            Criteria criteria = new Criteria();
            this.locationProvider = locationManager.getBestProvider(criteria, false);
            client = new AsyncHttpClient();
            myCookieStore = new PersistentCookieStore(this);
            client.setCookieStore(myCookieStore);
        }
    }

    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        // mMap.setOnMyLocationButtonClickListener(this);

        enableMyLocation();

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            return;
        }

        final LocationListener locationListener = new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {
                if (mPosition != null) {
                    mPosition.remove();
                }

                //when the location changes, update the map by zooming to the location
                LatLng position = new LatLng(location.getLatitude(), location.getLongitude());
                mPosition = mMap.addMarker(new MarkerOptions().position(position).title("AirQS Location").
                        icon(bitmapDescriptorFromVector(MainActivity.this, R.drawable.ic_raspberry)));
                CameraUpdate center = CameraUpdateFactory.newLatLng(position);
                mMap.moveCamera(center);

                CameraUpdate zoom = CameraUpdateFactory.zoomTo(15);
                mMap.animateCamera(zoom);

                update_my_location(new AirMetricLocation("pi01", System.currentTimeMillis(), position.latitude, position.longitude));
            }

            @Override
            public void onStatusChanged(String provider, int status, Bundle extras) {

            }

            @Override
            public void onProviderEnabled(String provider) {

            }

            @Override
            public void onProviderDisabled(String provider) {

            }
        };

        mMap.setOnMyLocationClickListener(new GoogleMap.OnMyLocationClickListener() {
            @SuppressLint("MissingPermission")
            @Override
            public void onMyLocationClick(@NonNull Location location) {
                if (location != null) {
                    Log.i("LOCATIONS", location.toString());
                    locationListener.onLocationChanged(location);
                }else{
                    location = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
                    if (location != null) {
                        Log.i("LOCATIONS", location.toString());
                        locationListener.onLocationChanged(location);
                    }
                }
            }
        });

        Location location = locationManager.getLastKnownLocation(locationProvider);
        if (location != null) {
            Log.i("LOCATIONS", location.toString());
            locationListener.onLocationChanged(location);
        }else{
            location = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
            if (location != null) {
                Log.i("LOCATIONS", location.toString());
                locationListener.onLocationChanged(location);
            }
        }

        // locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 3000, 5, this);
        locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 3000, 0, locationListener);
        // onLocationChanged(locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER));

        // Add a marker in Sydney and move the camera
//        LatLng sydney = new LatLng(-34, 151);
//        mMap.addMarker(new MarkerOptions().position(sydney).title("Marker in Sydney"));
//        mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney));
    }

//    @Override
//    public boolean onMyLocationButtonClick() {
//        Toast.makeText(this, "MyLocation button clicked", Toast.LENGTH_SHORT).show();
//        // Return false so that we don't consume the event and the default behavior still occurs
//        // (the camera animates to the user's current position).
//        return false;
//    }

//    @Override
//    public void onMyLocationClick(@NonNull Location location) {
//        Toast.makeText(this, "Current location:\n" + location, Toast.LENGTH_LONG).show();
//    }

    /**
     * Enables the My Location layer if the fine location permission has been granted.
     */
    private void enableMyLocation() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            // Permission to access the location is missing.
            PermissionUtils.requestPermission(this, LOCATION_PERMISSION_REQUEST_CODE,
                    Manifest.permission.ACCESS_FINE_LOCATION, true);
        } else if (mMap != null) {
            // Access to the location has been granted to the app.
            mMap.setMyLocationEnabled(true);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode != LOCATION_PERMISSION_REQUEST_CODE) {
            return;
        }

        if (PermissionUtils.isPermissionGranted(permissions, grantResults,
                Manifest.permission.ACCESS_FINE_LOCATION)) {
            // Enable the my location layer if the permission has been granted.
            enableMyLocation();
        } else {
            // Display the missing permission error dialog when the fragments resume.
            mPermissionDenied = true;
        }
    }

    /**
     * Displays a dialog with error message explaining that the location permission is missing.
     */
    private void showMissingPermissionError() {
        PermissionUtils.PermissionDeniedDialog
                .newInstance(true).show(getSupportFragmentManager(), "dialog");
    }

//    @Override
//    public void onLocationChanged(Location location) {
//        if (mPosition != null) {
//            mPosition.remove();
//        }
//
//        //when the location changes, update the map by zooming to the location
//        LatLng position = new LatLng(location.getLatitude(),location.getLongitude());
//        mPosition = this.mMap.addMarker(new MarkerOptions().position(position).title("AirQS Location"));
//        CameraUpdate center = CameraUpdateFactory.newLatLng(position);
//        this.mMap.moveCamera(center);
//
//        CameraUpdate zoom = CameraUpdateFactory.zoomTo(15);
//        this.mMap.animateCamera(zoom);
//    }

    private BitmapDescriptor bitmapDescriptorFromVector(Context context, @DrawableRes int vectorDrawableResourceId) {
        Drawable background = ContextCompat.getDrawable(context, R.drawable.ic_raspberry);
        background.setBounds(0, 0, background.getIntrinsicWidth(), background.getIntrinsicHeight());
        Drawable vectorDrawable = ContextCompat.getDrawable(context, vectorDrawableResourceId);
        // vectorDrawable.setBounds(40, 20, vectorDrawable.getIntrinsicWidth() + 40, vectorDrawable.getIntrinsicHeight() + 20);
        Bitmap bitmap = Bitmap.createBitmap(background.getIntrinsicWidth(), background.getIntrinsicHeight(), Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        background.draw(canvas);
        vectorDrawable.draw(canvas);
        return BitmapDescriptorFactory.fromBitmap(bitmap);
    }

    private void save_location(AirMetricLocation aml, final String token) {
        StringEntity entity = null;
        try {
            JSONObject jsonAML = new JSONObject();
            jsonAML.put("id", aml.getId());
            jsonAML.put("name", aml.getName());
            jsonAML.put("timestamp", aml.getTimestamp());
            jsonAML.put("lat", aml.getLat());
            jsonAML.put("lng", aml.getLng());
            entity = new StringEntity(jsonAML.toString());
        } catch (Exception e) {

        }

        Header h1 = new Header() {
            @Override
            public String getName() {
                return "Authorization";
            }

            @Override
            public String getValue() {
                return "Bearer " + token;
            }

            @Override
            public HeaderElement[] getElements() throws ParseException {
                return new HeaderElement[0];
            }
        };

        Header h2 = new Header() {
            @Override
            public String getName() {
                return "accept";
            }

            @Override
            public String getValue() {
                return "application/json";
            }

            @Override
            public HeaderElement[] getElements() throws ParseException {
                return new HeaderElement[0];
            }
        };

        client.post(null, "https://airqs.symmetry-apps.org/rest/api/v1/aml", new Header[]{h1,h2}, entity, "application/json", new JsonHttpResponseHandler() {

            @Override
            public void onStart() {
                // called before request is started
            }

            @Override
            public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                try {
                    Toast.makeText(MainActivity.this, "Updated location to lat: " + response.get("lat") + " and lng: " + response.get("lng"), Toast.LENGTH_SHORT).show();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    private void update_my_location(final AirMetricLocation aml) {
        Header h1 = new Header() {
            @Override
            public String getName() {
                return "Content-Type";
            }

            @Override
            public String getValue() {
                return "application/x-www-form-urlencoded";
            }

            @Override
            public HeaderElement[] getElements() throws ParseException {
                return new HeaderElement[0];
            }
        };

        RequestParams params = new RequestParams();
        params.add("grant_type", "password");
        params.add("username", "pi02");
        params.add("password", "moscraciun");
        params.add("client_id", "AirQS");
        HttpEntity ent = null;
        try {
            List<NameValuePair> entity = new ArrayList<>();
            entity.add(new BasicNameValuePair("grant_type", "password"));
            entity.add(new BasicNameValuePair("username", "pi02"));
            entity.add(new BasicNameValuePair("password", "moscraciun"));
            entity.add(new BasicNameValuePair("client_id", "AirQS"));
            ent = new UrlEncodedFormEntity(entity);

            client.post(null, "https://airqs.symmetry-apps.org/auth/realms/Google-Auth/protocol/openid-connect/token", ent, "application/x-www-form-urlencoded", new JsonHttpResponseHandler() {
                @Override
                public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                    try {
                        String token = response.getString("access_token");
                        save_location(aml, token);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }

                @Override
                public void onFailure(int statusCode, Header[] headers, String responseString, Throwable throwable) {
                    super.onFailure(statusCode, headers, responseString, throwable);
                }
            });
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }


}
