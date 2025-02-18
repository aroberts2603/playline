<?php
	if(file_exists("uploads/" . $_POST["artistName"]) == false) {
		mkdir("uploads/" . $_POST["artistName"]);
	}

	if(file_exists("uploads/" . $_POST["artistName"] . "/" . $_POST["albumName"]) == false) {
		mkdir("uploads/" . $_POST["artistName"] . "/" . $_POST["albumName"]);
	}

	$target_dir = "uploads/" . $_POST["artistName"] . "/" . $_POST["albumName"];

	$ending = explode(".", $_FILES["albumArt"]["name"]);
	move_uploaded_file($_FILES["albumArt"]["tmp_name"], $target_dir . "/albumArt" . "." . end($ending));

	$target_file = $target_dir . "/" . "albumInfo";

	$album_info = fopen($target_file . ".txt", "w");
	fwrite($album_info, "Release Name: " . $_POST["albumName"] . "\n");
	fwrite($album_info, "Copyright Owner: " . $_POST["cprOwner"] . "\n");
	fwrite($album_info, "Mastering: " . $_POST["mastering"] . "\n");
	fwrite($album_info, "Release Date: " . $_POST["releaseDate"] . " yyyy-mm-dd" . "\n");

	fclose($album_info);

?>