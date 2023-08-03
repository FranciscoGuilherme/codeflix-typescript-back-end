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

# ===================================
# -----[Instalacao do oh-my-zsh]-----
# ===================================

RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)" \
    -a 'export TERM=xterm-256color'

# ===========================================
# -----[Download dos plugins para o zsh]-----
# ===========================================

RUN git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions && \
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/zsh-autosuggestions && \
    git clone https://github.com/zdharma-continuum/fast-syntax-highlighting.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/fast-syntax-highlighting

# ===========================================
# -----[Ativacao dos plugins para o zsh]-----
# ===========================================

RUN echo 'source $ZSH/custom/plugins/zsh-completions/zsh-completions.plugin.zsh' >> ~/.zshrc && \
    echo 'source $ZSH/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.plugin.zsh' >> ~/.zshrc && \
    echo 'source $ZSH/custom/plugins/fast-syntax-highlighting/fast-syntax-highlighting.plugin.zsh' >> ~/.zshrc && \
    echo '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' >> ~/.zshrc  && \
    echo 'HISTFILE=/home/node/zsh/.zsh_history' >> ~/.zshrc

# ===============================
# -----[Keep application up]-----
# ===============================

CMD [ "sh", "-c", "npm install && tail -f /dev/null" ]
