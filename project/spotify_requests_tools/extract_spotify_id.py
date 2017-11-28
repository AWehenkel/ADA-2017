
import os
import json
import glob
import csv

def write_data(basedir,outputfile,ext='.json') :
    """
    From a root directory, go through all subdirectories
    and find all files with the given extension.
    Return all absolute paths in a list.
    """
    output = open(outputfile, "w") 

    output.write("echo_id,spotify_id\n")

    allfiles = []
    i = 0
    cur = ""
    for root, dirs, files in os.walk(basedir):
        files = glob.glob(os.path.join(root,'*'+ext))
        for f in files :
        	data = json.load(open(os.path.abspath(f)))

        	if len(data['response']['songs']) > 0:
	        	echonest_id = data['response']['songs'][0]['id']

	        	for s_data in data['response']['songs'][0]['tracks']:
	        		if s_data['catalog'] == 'spotify':

	        			tmp = s_data['foreign_id'].split(':')

	        			cur = cur + echonest_id+","+tmp[2]+"\n"

        				break
	        i = i + 1
	        if i % 1000 == 0:
	        	print(i)

	        if i % 50000 == 0:
	        	output.write(cur)
	        	cur = ""	
    output.close()    	



if __name__ == '__main__':

	data_path = 'millionsongdataset_echonest/'
	output_name = 'echonest_to_spotify.csv'

	write_data(data_path, output_name)

