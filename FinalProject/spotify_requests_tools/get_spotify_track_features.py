import base64 
import requests
import csv
import time

def send_request(headers, ids):
	status = 0
	q = None
	while(status != 200):
		q = requests.get("https://api.spotify.com/v1/audio-features", params={'ids':ids}, headers=headers)	

		status = q.status_code
		if status != 200:
			print(q.text)
			time.sleep(q.json()['Retry-After'])	

	return q

def insert_in_csv(writer, feature_track, song_ids):

	glob = []
	i = 0
	for feat in feature_track:
		if feat != None:
			tmp = [song_ids[i]]
			tmp.append(feat['danceability'])
			tmp.append(feat['energy'])
			tmp.append(feat['key'])
			tmp.append(feat['loudness'])
			tmp.append(feat['mode'])
			tmp.append(feat['speechiness'])
			tmp.append(feat['acousticness'])
			tmp.append(feat['instrumentalness'])
			tmp.append(feat['liveness'])
			tmp.append(feat['valence'])
			tmp.append(feat['tempo'])
			tmp.append(feat['duration_ms'])

			glob.append(tmp)

		i = i + 1

	writer.writerows(glob)



if __name__ == '__main__':

	client_id = "REDACTED"
	secret_id = "REDACTED"

	grant_type = 'client_credentials'

	base64_key = "REDACTED"

	r = requests.post("https://accounts.spotify.com/api/token", data={'grant_type': grant_type}, auth = (client_id,secret_id))
		#headers={'Authorization':base64_key})

	r_json = r.json()
	token = r_json['access_token'];

	output_file = "feature_songs.csv"
	input_file = "echonest_to_spotify.csv"

	headers = {"Authorization": "Bearer {}".format(token)}

	with open(input_file, 'r') as fr:
		with open(output_file, 'w') as fw:

			writer = csv.writer(fw)
			reader = csv.reader(fr)

			writer.writerow(['song_id','danceability','energy','key','loudness','mode','speechiness','acousticness','instrumentalness','liveness','valence','tempo','duration_ms'])

			total = 0
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

				i = i + 1
				if i == 100:			

					q = send_request(headers, ids)

					feature_track = q.json()['audio_features']

					insert_in_csv(writer, feature_track, song_ids)

					ids = ""
					delimiter = ""
					i = 0
					song_ids = []

					total = total + 100
					print(total)

			if i != 0:
				q = send_request(headers, ids)

				feature_track = q.json()['audio_features']

				insert_in_csv(writer, feature_track, song_ids)
