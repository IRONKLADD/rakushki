cut_source_url = https://github.com/piqnt/cutjs/archive/v0.4.2.tar.gz

clean :
	# delete libs directory
	rm -rf libs

	rm -f /tmp/cut_src.tar.gz

deps :
	# make libs directory if not present
	mkdir -p libs/CutJS

	# download and extract CutJS
	curl -o /tmp/cut_src.tar.gz -L $(cut_source_url) 
	tar -xvzf /tmp/cut_src.tar.gz -C libs/CutJS --strip-components 1

	rm -f /tmp/cut_src.tar.gz

