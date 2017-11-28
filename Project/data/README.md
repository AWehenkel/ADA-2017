# Data descriptions

(link to data https://drive.switch.ch/index.php/s/EPkS2fxNrBAYbL0)

* track_metadata.db : taken from the MillionSong dataset. It contains many information about each track, some of them are: track_id, song_id, artist_id, duration, artist_hotttnesss, year. There are useful to merge data coming from different datasets.

* msd_summary_file.h5 : taken from the MillionSong dataset. It contains supplementary metadata about tracks and some analysis of them. The one used are loudness, mode, tempo, key, song_hotttnesss, song_id, artist_latitude, artist_location, artist_longitude.

* millionsongdataset_echonest : taken from https://labs.acousticbrainz.org/million-song-dataset-echonest-archive . This contains all the mapping between IDs of different new APIs and the deprecated (and dead now) Echo Nest API. As most of the interesting features are unknown from the MillionSong dataset (energy, danceability, valence, ...), we needed to request spotify, thus we needed a mapping from echo nest to spotify track's id.
This one isn't present in the zip (too big), if you want to use it, follow the link.

* msd_tagtraum_cd1, msd_tagtraum_cd2.cls, msd_tagtraum_cd2c.cls : taken from http://www.tagtraum.com/msd_genre_datasets.html . It was some of auxiliary datasets recommended by MSD on their website. Each of them contains classification into categories for some of the tracks. Overall it covers around 350 000 tracks. These datasets have been built with semi supervised learning.

* echonest_to_spotify.csv : generated from spotify_requests_tools/extract_spotifyID_from_echonestID.py. This contains a simple mapping from echo nest song_id to spotify track_id. Note that there isn't a mapping for the 1'000'000 songs, but around 700'000.

* feature_songs.csv : generated from spotify_requests_tools/get_spotify_track_features.py. Now that we have a mapping, we can request features to spotify by batch of 100 track_id.

* track_year_popularity.csv : generated from spotify_requests_tools/get_spotify_track_year_and_popularity.py. We noticed that 480'000 song from MillionSong haven't a year, we extract it from spotify. However it wasn't convincing, as you get the year of the track from the year of the album it is associated with in spotify.

