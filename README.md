# Kenet Translator App

Kenet Translator App helps translate Korean, Japanese, and Chinese characters found in images into English. I created this app because I enjoy reading Chinese, Japanese, and Korean news, but I often browse articles on my laptop that include images with characters I don’t understand. That’s why I decided to develop this simple tool.

The app uses established Python libraries, particularly Pytesseract, for text recognition. I also set it up using Docker to avoid installing additional packages directly on my operating system. For development, I use the Windows Subsystem for Linux (WSL) terminal.

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
Or if you do not want to do any of this, just simply add the `CMD` and specify the appropriate command to run in the `docker-compose.override.yml` under the specific service (frontend, backend service)

Or you can also add the command directly in one of the Dockerfiles at the bottom of the line. e.g. frontend

```shell
CMD ["npm", "run", "dev"]
```
Or for backend

```shell
CMD ["flask", "--app", "./app.py", "run", "--host", "0.0.0.0"] 
```

## Personal Link

Thanks for visiting this repository! If you're looking for a web developer, feel free to check out my [personal website](https://kenjos75.github.io) where I showcase some of my past and current projects.


## Questions

If you have any questions about this project, you can directly message me at my personal email[kenjos75@gmail.com](mailto:kenjos75@gmail.com)
