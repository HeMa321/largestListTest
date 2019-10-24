package com.testdemo;

import android.content.Context;
import android.net.Uri;

import com.facebook.drawee.view.SimpleDraweeView;

public class GlideModule extends SimpleDraweeView {

    public GlideModule(Context context) {
        super(context);
    }

    public void setUrlPath(String url) {
        this.setImageURI(Uri.parse(url));
    }

}
