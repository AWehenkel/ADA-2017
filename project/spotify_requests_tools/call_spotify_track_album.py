import requests
import csv
import time

def insert_in_csv(writer, song_ids, tracks, albums):

	glob = []
	for song_id, track, album in zip(song_ids, tracks, albums):

		row = [song_id]
		if track != None:
			row.append(track['popularity'])
		else:
			row.append('-1')

		if album != None:

			if len(album['release_date']) > 4:
				row.append(album['release_date'][:4])
			else:
				row.append(album['release_date'])

			# genre is wrong from spotify
			'''
			genres = ""
			delim = ""
			for genre in album['genres']:
				genres = delim + genre
				delim = "_"

			row.append(genres)
			'''

		else:
			row.append('0')
			row.append('')

		glob.append(row)

	writer.writerows(glob)

def get_spotify_infos(headers, type_spotify, ids):

	status = 0
	q = None
	while(status != 200):
		q = requests.get("https://api.spotify.com/v1/" + type_spotify, params={'ids':ids}, headers=headers)	

		status = q.status_code
		if status == 400:
			return None
		if status == 429:
			print(q.text)
			time.sleep(q.json()['Retry-After'])	

	return q.json()[type_spotify]

def get_spotify_info(headers, type_spotify, spotify_id):
	status = 0
	q = None
	while(status != 200):
		q = requests.get("https://api.spotify.com/v1/" + type_spotify + "/" + spotify_id, headers=headers)	

		status = q.status_code
		if status == 400:
			return None
		if status == 429:
			print(q.text)
			time.sleep(q.json()['Retry-After'])	

	return q.json()

def extract_album_ids(tracks):

	album_ids = ''
	delimiter = ''
	for track in tracks:
		if track != None:
			album_ids += delimiter + track['album']['id']
		else:
			album_ids += delimiter + ''
		delimiter = ','

	return album_ids


if __name__ == '__main__':

	client_id = "635dd6cc66844154a9d70db7d8afe8e9"
	secret_id = "446a707bbc394f67ba2e3f1d9df65735"

	grant_type = 'client_credentials'

	base64_key = "NjM1ZGQ2Y2M2Njg0NDE1NGE5ZDcwZGI3ZDhhZmU4ZTk6NDQ2YTcwN2JiYzM5NGY2N2JhMmUzZjFkOWRmNjU3MzU="

	r = requests.post("https://accounts.spotify.com/api/token", data={'grant_type': grant_type}, auth = (client_id,secret_id))
		#headers={'Authorization':base64_key})

	r_json = r.json()
	token = r_json['access_token'];

	output_file = "../MillionSong/track_year_popularity.csv"
	input_file = "../MillionSong/echonest_to_spotify.csv"

	headers = {"Authorization": "Bearer {}".format(token)}

	with open(input_file, 'r') as fr:
		with open(output_file, 'a') as fw:

			writer = csv.writer(fw)
			reader = csv.reader(fr)

			bypassLine = 708701
			for _ in range(0, bypassLine):
				next(reader)

			if bypassLine == 1:
				writer.writerow(['song_id','track_popularity','album_release'])

			total = bypassLine - 1

			i = 0
			ids = ""
			delimiter = ""
			song_ids = []
			for row in reader:

				song_id = row[0]
				spotify_id = row[1]

				ids = ids + delimiter + spotify_id
				delimiter = ","
				song_ids.append(song_id)

				total += 1
				i = i + 1
				if i == 20:

					spotify_tracks = get_spotify_infos(headers, "tracks", ids)
					if spotify_tracks == None:

						for track_id, song_id in zip(ids,song_ids):
							spotify_track = get_spotify_info(headers, "tracks", track_id)

							if spotify_track != None:
								spotify_album = get_spotify_info(headers, "albums", spotify_track['album']['id'])

								if spotify_album != None:
									insert_in_csv(writer, [song_id], [spotify_track], [spotify_album])


					else:
						album_ids = extract_album_ids(spotify_tracks)

						spotify_albums = get_spotify_infos(headers, "albums", album_ids)

						if spotify_albums == None:

							for album_id, spotify_track, song_id in zip(album_ids.split(','), spotify_tracks, song_ids):

								if spotify_track != None:
									spotify_album = get_spotify_info(headers, "albums", spotify_track['album']['id'])

									if spotify_album != None:
										insert_in_csv(writer, [song_id], [spotify_track], [spotify_album])


						else:
							insert_in_csv(writer, song_ids, spotify_tracks, spotify_albums)

					i = 0
					ids = ""
					delimiter = ""
					song_ids = []


				if total % 100 == 0:
					print(total)

			if i != 0:

				spotify_tracks = get_tracks(ids)

				album_ids = extract_album_ids(spotify_tracks)

				spotify_albums = get_albums(album_ids)

				insert_in_csv(writer, song_ids, spotify_tracks, spotify_albums)


				