from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView,
)

urlpatterns=[
    path('register/',views.register),
    path('tokenlogin/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('refresh-token/',TokenRefreshView.as_view(),name='token_refresh'),
    path('products/',views.get_products),
    path('products/<int:pk>/',views.get_product),
    path('categories/',views.get_categories),
    path('cart/',views.get_cart),
    path('cart/add/',views.add_to_cart),
    path('cart/remove/',views.remove_from_cart),
    path('cart/update/',views.update_cart_quantity),
    path('order/create/',views.create_order),
] 