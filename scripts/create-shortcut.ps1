# Script to create or update the GDG RMKEC desktop shortcut
$desktopPath = [Environment]::GetFolderPath('Desktop')
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectDir = (Get-Item $scriptDir).Parent.FullName
$shortcutPath = Join-Path $desktopPath "GDG RMKEC.lnk"
$vbsPath = Join-Path $scriptDir "launch.vbs"
$iconPath = Join-Path $projectDir "app\favicon.ico"

$wshShell = New-Object -ComObject WScript.Shell
$shortcut = $wshShell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = "C:\Windows\System32\wscript.exe"
$shortcut.Arguments = "`"$vbsPath`""
$shortcut.WorkingDirectory = $projectDir
$shortcut.IconLocation = "$iconPath,0"
$shortcut.Description = "GDG RMKEC Application"
$shortcut.Save()

Write-Host "Shortcut successfully created at: $shortcutPath" -ForegroundColor Green
