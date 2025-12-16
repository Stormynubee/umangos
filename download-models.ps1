# UmangOS - Face-api.js Model Downloader
# Developed by Hansraj

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "UmangOS - Model Downloader" -ForegroundColor Cyan
Write-Host "Developed by Hansraj" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$modelsDir = ".\public\models"
$baseUrl = "https://raw.githubusercontent.com/vladmandic/face-api/master/model"

$models = @(
    "tiny_face_detector_model-weights_manifest.json",
    "tiny_face_detector_model-shard1",
    "face_landmark_68_model-weights_manifest.json",
    "face_landmark_68_model-shard1",
    "face_recognition_model-weights_manifest.json",
    "face_recognition_model-shard1",
    "face_recognition_model-shard2",
    "face_expression_model-weights_manifest.json",
    "face_expression_model-shard1"
)

# Create models directory if it doesn't exist
if (-not (Test-Path $modelsDir)) {
    New-Item -ItemType Directory -Path $modelsDir -Force | Out-Null
}

Write-Host "Downloading face-api.js models..." -ForegroundColor Yellow
Write-Host ""

$downloaded = 0
$failed = 0

foreach ($model in $models) {
    $url = "$baseUrl/$model"
    $output = Join-Path $modelsDir $model
    
    Write-Host "Downloading: $model" -ForegroundColor White
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $output -UseBasicParsing
        Write-Host "  Success" -ForegroundColor Green
        $downloaded++
    }
    catch {
        Write-Host "  Failed" -ForegroundColor Red
        $failed++
    }
    
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Download Summary:" -ForegroundColor Cyan
Write-Host "  Downloaded: $downloaded" -ForegroundColor Green
Write-Host "  Failed: $failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($downloaded -eq $models.Count) {
    Write-Host "All models downloaded successfully!" -ForegroundColor Green
    Write-Host "You can now run: npm run dev" -ForegroundColor Yellow
} else {
    Write-Host "Some models failed to download" -ForegroundColor Yellow
    Write-Host "Please download them manually from:" -ForegroundColor Yellow
    Write-Host "https://github.com/vladmandic/face-api/tree/master/model" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
