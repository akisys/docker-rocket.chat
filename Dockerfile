FROM rocket.chat
MAINTAINER Alexander Kuemmel
USER rocketchat
ADD rc.js /app/bundle/
CMD [ "node", "rc.js" ]
