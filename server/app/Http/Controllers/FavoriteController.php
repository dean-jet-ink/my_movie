<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class FavoriteController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $favorites = $user->favorites;

        $apiKey = config('services.tmdb.api_key');
        $mediaList = [];

        foreach ($favorites as $favorite) {
            $mediaType = $favorite->media_type;
            $mediaId = $favorite->media_id;
            $url = "https://api.themoviedb.org/3/" . $mediaType . "/" . $mediaId . "?api_key=" . $apiKey . "&language=ja-JP";
            $response = Http::get($url);

            if ($response->successful()) {
                $mediaList[] = array_merge($response->json(), ['media_type' => $mediaType]);
            }
        }

        return response()->json($mediaList);
    }

    public function status(Request $request)
    {
        $validatedData = $request->validate([
            'media_type' => 'required|string',
            'media_id' => 'required|integer'
        ]);

        $isFavorite = Favorite::where('user_id', Auth::id())
            ->where('media_type', $validatedData['media_type'])
            ->where('media_id', $validatedData['media_id'])
            ->exists();

        return response()->json($isFavorite);
    }

    public function toggle(Request $request)
    {
        $validatedData = $request->validate([
            'media_type' => 'required|string',
            'media_id' => 'required|integer'
        ]);

        $favorite = Favorite::where('user_id', Auth::id())
            ->where('media_type', $validatedData['media_type'])
            ->where('media_id', $validatedData['media_id'])
            ->first();

        if ($favorite) {
            $favorite->delete();
        } else {
            Favorite::create([
                'media_type' => $validatedData['media_type'],

                'media_id' => $validatedData['media_id'],
                'user_id' => Auth::id()
            ]);
        }

        return response()->json(['status' => 'success']);
    }
}
