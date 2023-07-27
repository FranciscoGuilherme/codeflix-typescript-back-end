FROM node:14.15.4-slim

# ==========================
# -----[Container user]-----
# ==========================

USER node

# ====================================
# -----[Container specifications]-----
# ====================================

WORKDIR /home/node/app

# ===============================
# -----[Keep application up]-----
# ===============================

CMD [ "sh", "-c", "npm install && tail -f /dev/null" ]
