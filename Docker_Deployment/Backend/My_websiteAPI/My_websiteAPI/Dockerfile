    FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
    WORKDIR /app
    COPY *.csproj ./ 
    RUN dotnet restore
    
    COPY . ./
    
    RUN dotnet publish -c Release -o out
    
    FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
    WORKDIR /app
    
    RUN apt-get update && apt-get install -y \
        wget \
        ca-certificates \
        && wget https://dotnetcli.blob.core.windows.net/dotnet/Sdk/8.0.100/dotnet-sdk-8.0.100-linux-x64.tar.gz \
        && mkdir -p /usr/share/dotnet \
        && tar zxf dotnet-sdk-8.0.100-linux-x64.tar.gz -C /usr/share/dotnet \
        && if [ -f /usr/bin/dotnet ]; then rm -f /usr/bin/dotnet; fi \
        && ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet
    
    COPY --from=build /app/out ./
    
    ENTRYPOINT ["dotnet", "My_websiteAPI.dll"]
    