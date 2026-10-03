$scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { Split-Path -Parent $MyInvocation.MyCommand.Path }
$projectDir = Split-Path -Parent $scriptDir
$url = "http://localhost:3000"

# Prioritize 64-bit Node.js in environment
$node64 = "$env:LOCALAPPDATA\Programs\nodejs-x64"
if (Test-Path "$node64\node.exe") {
    $env:PATH = "$node64;$env:PATH"
} elseif (Test-Path "$env:ProgramFiles\nodejs\node.exe") {
    $env:PATH = "$env:ProgramFiles\nodejs;$env:PATH"
}

function Test-PortOpen {
    param([string]$hostName, [int]$port)
    $client = $null
    try {
        $client = New-Object System.Net.Sockets.TcpClient
        $iar = $client.BeginConnect($hostName, $port, $null, $null)
        $wait = $iar.AsyncWaitHandle.WaitOne(600)
        if ($wait -and $client.Connected) {
            $client.EndConnect($iar)
            return $true
        }
    } catch {
        return $false
    } finally {
        if ($client) { $client.Close() }
    }
    return $false
}

$isOpen = Test-PortOpen -hostName "127.0.0.1" -port 3000

if (-not $isOpen) {
    $serverBat = Join-Path $scriptDir "run-server.bat"
    Start-Process cmd.exe -ArgumentList "/k `"$serverBat`"" -WorkingDirectory $projectDir
    
    $timeoutSeconds = 30
    $startTime = Get-Date
    while (-not $isOpen -and ((Get-Date) - $startTime).TotalSeconds -lt $timeoutSeconds) {
        Start-Sleep -Milliseconds 1000
        $isOpen = Test-PortOpen -hostName "127.0.0.1" -port 3000
    }
}

# Open the application in the default browser
Start-Process $url
