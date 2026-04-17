# Build stack that matches ionic Appflow
# https://ionic.io/docs/appflow/build-stacks
ARG DEBIAN_VERSION=12.9

FROM debian:${DEBIAN_VERSION}

ARG CORDOVA_VERSION=12.0.0
ARG IONIC_VERSION=7.2.0
# Must be an integer
ARG NODE_VERSION=20
ARG GRADLE_VERSION=8.10.2
# Must be an integer
ARG JAVA_VERSION=17
# Must be an integer
ARG ANDROID_SDK=34
ARG ANDROID_BUILD_TOOLS_VERSION=35.0.0
# https://developer.android.com/studio/#downloads
# Look for "commandlinetools-linux-<some build number>_latest.zip"
ARG ANDROID_COMMANDLINE_TOOLS=11076708

RUN apt-get -q update && \
    export DEBIAN_FRONTEND=noninteractive && \
    apt-get -qq install --no-install-recommends apt-utils dialog 2>&1

# Dockerfile dependencies
RUN apt-get install -qq \
    curl \
    unzip \
    wget

################################################################################
# NodeJS
################################################################################
RUN curl -sL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - && \
    apt-get install -qq nodejs

################################################################################
# ionic
################################################################################
# https://ionicframework.com/
RUN npm install -g @ionic/cli@${IONIC_VERSION} && \
    ionic -v

################################################################################
# Cordova
################################################################################
# https://cordova.apache.org/#getstarted
RUN npm install -g cordova@${CORDOVA_VERSION} && \
    cordova telemetry off && \
    cordova -v

################################################################################
# GitHub Copilot CLI
################################################################################
# https://docs.github.com/en/copilot
RUN npm install -g @githubnext/github-copilot-cli

################################################################################
# JAVA
################################################################################
RUN wget https://download.oracle.com/java/${JAVA_VERSION}/latest/jdk-${JAVA_VERSION}_linux-x64_bin.deb && \
    dpkg -i jdk* && \
    rm jdk* && \
    java -version

################################################################################
# Gradle
################################################################################
ENV GRADLE_HOME=/opt/gradle-${GRADLE_VERSION}
ENV PATH=$PATH:$GRADLE_HOME/bin

WORKDIR /opt

RUN curl -L https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip -o gradle-bin.zip && \
    unzip gradle-bin.zip && \
    rm gradle-bin.zip

################################################################################
# Android SDK
################################################################################
# https://developer.android.com/studio/#downloads
ENV ANDROID_SDK_URL="https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_COMMANDLINE_TOOLS}_latest.zip" \
    ANDROID_SDK_ROOT="/opt/android" \
    ANDROID_HOME="/opt/android"

ENV PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/build-tools/$ANDROID_BUILD_TOOLS_VERSION
# ANDROID_HOME/ANDROID_SDK_ROOT must be defined for cordova/capcitor
RUN echo "export ANDROID_SDK_ROOT=${ANDROID_SDK_ROOT}" >> ~/.bashrc && \
    echo "export ANDROID_HOME=${ANDROID_SDK_ROOT}" >> ~/.bashrc

RUN apt-get install -qq usbutils

WORKDIR /opt

RUN mkdir -p android && cd android && \
    wget -O tools.zip ${ANDROID_SDK_URL} && \
    unzip tools.zip && rm tools.zip && \
    cd cmdline-tools && \
    mkdir -p latest && \
    ls | grep -v latest | xargs mv -t latest

RUN mkdir -p /root/.android && touch /root/.android/repositories.cfg && \
    while true; do echo 'y'; sleep 2; done | sdkmanager "platform-tools" "build-tools;$ANDROID_BUILD_TOOLS_VERSION" && \
    while true; do echo 'y'; sleep 2; done | sdkmanager "platforms;android-$ANDROID_SDK"

RUN yes | sdkmanager --licenses --sdk_root=$ANDROID_SDK_ROOT

RUN chmod a+x -R $ANDROID_SDK_ROOT && \
    chown -R root:root $ANDROID_SDK_ROOT

################################################################################
# Google Chrome
################################################################################
# Needed for CHANGELOG.pdf creation
RUN apt-get update && apt-get install -y fonts-liberation && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install -y ./google-chrome-stable_current_amd64.deb || true && \
    rm google-chrome-stable_current_amd64.deb

################################################################################
# SSH
################################################################################
RUN apt-get update && apt-get install -qq openssh-server && \
    sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config && \
    echo "root:0000" | chpasswd && \
    # Make the `.ssh` dir so we can write to it later.
    mkdir -p /root/.ssh

################################################################################
# Git
################################################################################
RUN apt-get install -qq git && \
    # Enable git completion
    echo "source /usr/share/bash-completion/completions/git" >> ~/.bashrc && \
    # Manually create the config file for Git.
    # This file is able to be used in a volume unlike the default location.
    # mkdir -p ~/.config/git && \
    touch ~/.gitconfig && \
    # Fix: Git error: "detected dubious ownership"
    git config --system --add safe.directory '*' && \
    # Fix: The authenticity of host 'github.com (140.82.113.4)' can't be established.
    ssh-keyscan github.com >> ~/.ssh/known_hosts

################################################################################
# Housekeeping
################################################################################

# Update non-login terminal's path
RUN echo "export PATH=$PATH:/etc/profile" >> ~/.bashrc

# Clean up
RUN rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    apt-get autoremove -y && \
    apt-get clean

# Copy entrypoint script
COPY --chmod=755 entrypoint.sh /entrypoint.sh

# Set entrypoint
ENTRYPOINT ["/entrypoint.sh"]
