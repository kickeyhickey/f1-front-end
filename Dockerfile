# Build arguments
ARG DEBIAN_VERSION=12.9
ARG NODE_VERSION=20
ARG JAVA_VERSION=21
ARG GRADLE_VERSION=8.14.2
ARG ANDROID_SDK=35
ARG ANDROID_BUILD_TOOLS_VERSION=35.0.0
ARG ANDROID_COMMANDLINE_TOOLS=13114758
ARG CORDOVA_VERSION=12.0.0
ARG IONIC_VERSION=7.2.1

# Base image
FROM debian:${DEBIAN_VERSION}

# Re-declare args after FROM
ARG NODE_VERSION
ARG JAVA_VERSION
ARG GRADLE_VERSION
ARG ANDROID_SDK
ARG ANDROID_BUILD_TOOLS_VERSION
ARG ANDROID_COMMANDLINE_TOOLS
ARG CORDOVA_VERSION
ARG IONIC_VERSION

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive
ENV ANDROID_HOME=/opt/android-sdk
ENV GRADLE_HOME=/opt/gradle
ENV PATH=${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${GRADLE_HOME}/bin

# Install base dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    unzip \
    openssh-server \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install Java
RUN apt-get update && apt-get install -y openjdk-${JAVA_VERSION}-jdk \
    && rm -rf /var/lib/apt/lists/*

# Install Gradle
RUN wget https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip -P /tmp \
    && unzip -d /opt /tmp/gradle-${GRADLE_VERSION}-bin.zip \
    && ln -s /opt/gradle-${GRADLE_VERSION} ${GRADLE_HOME} \
    && rm /tmp/gradle-${GRADLE_VERSION}-bin.zip

# Install Android SDK Command Line Tools
RUN mkdir -p ${ANDROID_HOME}/cmdline-tools \
    && wget https://dl.google.com/android/repository/commandlinetools-linux-${ANDROID_COMMANDLINE_TOOLS}_latest.zip -P /tmp \
    && unzip -d ${ANDROID_HOME}/cmdline-tools /tmp/commandlinetools-linux-${ANDROID_COMMANDLINE_TOOLS}_latest.zip \
    && mv ${ANDROID_HOME}/cmdline-tools/cmdline-tools ${ANDROID_HOME}/cmdline-tools/latest \
    && rm /tmp/commandlinetools-linux-${ANDROID_COMMANDLINE_TOOLS}_latest.zip

# Accept Android SDK licenses and install required packages
RUN yes | sdkmanager --licenses \
    && sdkmanager "platform-tools" \
    && sdkmanager "platforms;android-${ANDROID_SDK}" \
    && sdkmanager "build-tools;${ANDROID_BUILD_TOOLS_VERSION}"

# Install Cordova and Ionic
RUN npm install -g cordova@${CORDOVA_VERSION} @ionic/cli@${IONIC_VERSION}

# Configure SSH
RUN mkdir /var/run/sshd \
    && echo 'root:root' | chpasswd \
    && sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config \
    && sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

# Expose SSH and ADB ports
EXPOSE 22 5037

# Set working directory
WORKDIR /f1-app

# Start SSH and ADB server
CMD service ssh start && adb start-server && tail -f /dev/null
