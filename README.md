# Kenet Translator App

Kenet Translator App will help you translate some characters that are in Korean,Japanese, and Chinese that are found in some images you see and translate it into english language. I personally made this because I like reading chinese, japanese, and korean news, but sometimes I read news/articles using my laptop where the article
includes some images that has chinese/japanese/korean characters which I obviously do not understand that's why I decided to develop this simple app which also uses some already established python library particularly
Pytesseract library. I made it with Docker setup as I do not want to add additional packages in my operating system. By the way I am using windows sublinux system terminal.

## How to Use

It is very straightforward just clone this repository and go to the root directory of this project and run the command in your terminal 

```shell
sudo docker-compose up --build -d
```

After deploying containers, you need to go inside the container for backend and frontend e.g. for frontend container

```shell
sudo docker exec -it <container-id> bash
```
Then you have to run the development server

```shell
npm run dev
```
For backend container, when you are already inside the backend container you need to run:

```shell
flask --app ./app.py run --host=0.0.0.0
```
Or if you do not want to do any of this, just simply add the `command` and specify the appropriate command to run in the `docker-compose.override.yml` under the specific service (frontend, backend service)

Or you can also add the command directly in one of the Dockerfiles at the bottom of the line. e.g. frontend

```shell
CMD ["npm", "run", "dev"]
```
Or for backend

```shell
CMD ["flask", "--app", "./app.py", "run", "--host", "0.0.0.0"] 
```

## Personal Link

Thank you for taking your time in visiting repository. If you are looking for a web developer of any framework, you are free to visit my [personal website](https://kenjos75.github.io) where I listed some of my previous/current projects.

## Questions

If you have any questions about this project, you can message me at my [kenjos75@gmail.com](mailto:kenjos75@gmail.com)
