$directory = "..\public\images"

Get-ChildItem -Path $directory -Filter *.png -Recurse | ForEach-Object {
    $pngFile = $_.FullName
    $webpFile = [System.IO.Path]::ChangeExtension($pngFile, ".webp")

    # ffmpeg 명령어 실행
    & ffmpeg -y -i "`"$pngFile`"" -lossless 1 "`"$webpFile`""

    # # 변환이 성공하면 PNG 파일 삭제
    if (Test-Path $webpFile) {
        Remove-Item "$pngFile"
        Write-Output "Converted and deleted: $pngFile"
    } else {
        Write-Output "Failed to convert: $pngFile"
    }
}