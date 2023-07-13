package com.seb_main_004.whosbook.curation.service;

import com.seb_main_004.whosbook.curation.dto.CurationPostDto;
import com.seb_main_004.whosbook.curation.entity.CurationImage;
import com.seb_main_004.whosbook.curation.entity.CurationSaveImage;
import com.seb_main_004.whosbook.curation.repository.CurationImageRepository;
import com.seb_main_004.whosbook.exception.BusinessLogicException;
import com.seb_main_004.whosbook.exception.ExceptionCode;
import com.seb_main_004.whosbook.image.service.StorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class CurationImageService {
    private final CurationImageRepository curationImageRepository;
    private final StorageService storageService;
    private final static String CURATION_IMAGE_PATH = "curationImages";

    // 이미지 등록
    public CurationImage uploadCurationImage(MultipartFile image){


        String key = storageService.makeObjectKey(image, CURATION_IMAGE_PATH);
        String imagePath = storageService.store(image, CURATION_IMAGE_PATH);

        CurationImage curationImage = new CurationImage(key, imagePath);

        log.info("# 이미지 업로드 성공! 업로드 된 이미지 URL : {}", curationImage.getPath());

        return curationImageRepository.save(curationImage);
    }

    public void deleteCurationImage(long curationImageId) {
        CurationImage curationImage = findVerifiedCurationImageById(curationImageId);
        log.info("# AWS S3 이미지 삭제 실행, 이미지 ID : {}", curationImageId);

        storageService.delete(curationImage.getImageKey());
        curationImageRepository.delete(curationImage);
        log.info("# 큐레이션 이미지 DB 삭제 완료, 이미지 ID : {}", curationImageId);
    }

    public CurationImage findVerifiedCurationImageById(long curationImageId){
       Optional<CurationImage> optionalCurationImage = curationImageRepository.findById(curationImageId);
       return optionalCurationImage.orElseThrow(
               () -> new BusinessLogicException(ExceptionCode.IMAGE_NOT_FOUND)
       );
    }

    public List<CurationImage> verifyCurationSaveImages(CurationPostDto postDto) {
        List<Long> curationImageIds = postDto.getImageIds();
        String content = postDto.getContent();

        List<CurationImage> curationImages = new ArrayList<>();
        for (long curationImageId : curationImageIds){
            CurationImage curationImage = findVerifiedCurationImageById(curationImageId);
            if (content.contains(curationImage.getImageKey())){
               curationImages.add(curationImage);
            } else {
                deleteCurationImage(curationImageId);
            }
        }

        return curationImages;
    }

}