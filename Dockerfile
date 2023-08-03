FROM node:18.16.0-slim

RUN apt update && apt install -y --no-install-recommends \
    git \
    zsh \
    curl \
    wget \
    fonts-powerline \
    ca-certificates

# ==========================
# -----[Container user]-----
# ==========================

USER node

COPY ./docker/zsh/powerlevel10k/.p10k.zsh /home/node/.p10k.zsh

# ====================================
# -----[Container specifications]-----
# ====================================

WORKDIR /home/node/app

# =============================
# -----[Instalacao do zsh]-----
# =============================

RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)" \
    -p git \
    -p git-flow \
    -p https://github.com/zdharma-continuum/fast-syntax-highlighting \
    -p https://github.com/zsh-users/zsh-autosuggestions \
    -p https://github.com/zsh-users/zsh-completions \
    -a 'export TERM=xterm-256color'

RUN echo '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' >> ~/.zshrc
RUN echo 'HISTFILE=/home/node/zsh/.zsh_history' >> ~/.zshrc

# ===============================
# -----[Keep application up]-----
# ===============================

CMD [ "sh", "-c", "npm install && tail -f /dev/null" ]
